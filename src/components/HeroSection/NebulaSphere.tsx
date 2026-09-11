import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

interface NebulaSphereProps {
    scrollProgress?: number;
    onReady?: () => void;
    onError?: () => void;
    reduceMotion?: boolean;
}

// Camera animation keyframes
const CAMERA_START = {
    position: new THREE.Vector3(0, 0, 20),
    lookAt: new THREE.Vector3(0, 0, 0)
};

const CAMERA_END = {
    position: new THREE.Vector3(0, 18, 0.1), // Almost directly above, slight Z offset to avoid gimbal lock
    lookAt: new THREE.Vector3(0, -6, 0) // Look at nebula center
};

export function NebulaSphere({
    scrollProgress = 0,
    onReady,
    onError,
    reduceMotion = false,
}: NebulaSphereProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef(scrollProgress);

    // Keep the ref in sync with the prop
    useEffect(() => {
        scrollProgressRef.current = scrollProgress;
    }, [scrollProgress]);

    const sceneRef = useRef<{
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        composer: EffectComposer;
        controls: OrbitControls;
        gridMaterial: THREE.ShaderMaterial;
        sphereMaterial: THREE.ShaderMaterial;
        sphere: THREE.Mesh;
        clock: THREE.Clock;
        animationId: number;
    } | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const testCanvas = document.createElement('canvas');
        const hasWebGl = Boolean(
            testCanvas.getContext('webgl2')
            || testCanvas.getContext('webgl')
            || testCanvas.getContext('experimental-webgl'),
        );

        if (!hasWebGl) {
            onError?.();
            return;
        }

        // Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050011, 0.02);

        const camera = new THREE.PerspectiveCamera(
            50,
            container.clientWidth / container.clientHeight,
            0.1,
            500
        );
        // Camera positioned to view the nebula cloud in the lower portion of the viewport
        // Camera looks at a point ABOVE the nebula so the nebula appears in the lower part of the frame
        camera.position.set(0, 0, 20);
        camera.lookAt(0, 0, 0); // Look at center, nebula is below this point

        let renderer: THREE.WebGLRenderer;

        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch {
            onError?.();
            return;
        }
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.maxPolarAngle = Math.PI / 2 - 0.1;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = false; // Disable rotation to keep the view fixed
        controls.target.set(0, 0, 0); // Set target to match lookAt (center of scene, above nebula)

        // Post-Processing with bloom
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(container.clientWidth, container.clientHeight),
            1.25,
            0.8,
            0.3
        );
        composer.addPass(bloomPass);

        // Black Hole Grid
        const gridSize = 15;
        const gridSegments = 256;
        const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, gridSegments, gridSegments);

        // Warp geometry
        const positions = gridGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const r = Math.sqrt(x * x + y * y);

            let z = 0;
            if (r < 0.2) {
                z = -10;
            } else {
                z = -8 / Math.pow(r, 0.8) + 1.0;
            }
            positions.setZ(i, z);
        }
        gridGeometry.computeVertexNormals();

        // Grid Shader
        const gridMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                color: { value: new THREE.Color(0.8, 0.2, 1.0) }
            },
            vertexShader: `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        varying vec3 vPos;

        void main() {
          vec2 gridUv = vUv * 40.0;
          float thickness = 0.05;
          float xLine = step(1.0 - thickness, fract(gridUv.x));
          float yLine = step(1.0 - thickness, fract(gridUv.y));
          float grid = max(xLine, yLine);

          float dist = length(vPos.xy);
          
          float centerGlow = 1.0 / (1.0 + dist * 0.5);
          centerGlow = pow(centerGlow, 1.0);

          float wave1 = sin(dist * 2.0 + time * 5.0);
          float streak1 = smoothstep(0.9, 1.0, wave1);
          
          float wave2 = sin(dist * 1.0 + time * 3.0 + 2.0); 
          float streak2 = smoothstep(0.7, 1.0, wave2);
          
          float breaker = sin(vPos.x * 0.5) * sin(vPos.y * 0.5);
          float mask = smoothstep(-0.2, 0.5, breaker);
          
          float flow = (streak1 + streak2 * 0.5);
          flow *= (0.5 + 1.0 / (dist + 0.1));

          float brightness = flow * grid;

          vec3 baseColor = color * grid * 0.2; 
          vec3 streakColor = vec3(1.0, 0.8, 1.0) * brightness * 5.0;
          
          float horizon = smoothstep(1.5, 0.0, dist) * 2.0;
          streakColor += vec3(0.5, 0.8, 1.0) * horizon * grid;

          float maxRadius = 7.0;
          float circleMask = 1.0 - smoothstep(1.5, maxRadius, dist);
          
          vec3 finalColor = (baseColor + streakColor) * circleMask;
          float alpha = circleMask;
          
          if (dist > maxRadius) alpha = 0.0;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
            transparent: true,
            opacity: 0.5,
            side: THREE.FrontSide,
            blending: THREE.NormalBlending,
            depthWrite: true
        });

        const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
        gridMesh.rotation.x = -Math.PI / 2;
        gridMesh.position.y = -8; // Move grid below camera center so it appears in lower viewport
        scene.add(gridMesh);

        // Noise GLSL
        const noiseGLSL = `
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) { 
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.1;
        float frequency = 1.0;
        for(int i = 0; i < 4; i++) {
          value += amplitude * snoise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
    `;

        // Sphere
        const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
        const sphereMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 }
            },
            vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        ${noiseGLSL}
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPos;
        uniform float time;

        void main() {
          vec3 noisePos = vPosition * 0.8 + vec3(0.0, time * 0.15, 0.0);
          float cloudDensity = fbm(noisePos);
          
          float swirl = fbm(vPosition * 1.1 + vec3(time * 0.1, 0.0, time * 0.08));
          cloudDensity = mix(cloudDensity, swirl, 0.4);
          cloudDensity = smoothstep(-0.3, 0.8, cloudDensity);

          vec3 color1 = vec3(0.4, 0.1, 0.6);
          vec3 color2 = vec3(0.8, 0.3, 0.9);
          vec3 color3 = vec3(0.3, 0.5, 1.0);
          
          vec3 cloudColor = mix(color1, color2, cloudDensity);
          cloudColor = mix(cloudColor, color3, cloudDensity * 0.7);

          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);
          
          vec3 rimColor = vec3(1.0, 0.9, 1.0);
          vec3 finalColor = cloudColor + rimColor * fresnel * 0.025;
          
          float innerGlow = pow(cloudDensity, 1.5);
          finalColor += vec3(0.6, 0.3, 0.8) * innerGlow * 0.0;

          float alpha = mix(0.3, 0.9, fresnel) + cloudDensity * 0.4;
          alpha = clamp(0.55, 0.55, 0.55);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(0, -7, 0); // Position sphere above grid, below camera center
        scene.add(sphere);

        // Background Particles
        const pGeo = new THREE.BufferGeometry();
        const pCount = 2000;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 200;
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            size: 0.15,
            color: 0x9955ff,
            transparent: true,
            opacity: 0.8
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        // Animation
        const clock = new THREE.Clock();

        // Temporary vectors for lerp calculations
        const tempPosition = new THREE.Vector3();
        const tempLookAt = new THREE.Vector3();

        let hasRendered = false;

        function renderFrame() {
            const time = clock.getElapsedTime();
            const progress = scrollProgressRef.current;

            // Interpolate camera position based on scroll progress
            // Use easeInOutCubic for smoother animation
            const easedProgress = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            //console.log(easedProgress);

            tempPosition.lerpVectors(CAMERA_START.position, CAMERA_END.position, easedProgress);
            tempLookAt.lerpVectors(CAMERA_START.lookAt, CAMERA_END.lookAt, easedProgress);

            camera.position.copy(tempPosition);
            camera.lookAt(tempLookAt);
            controls.target.copy(tempLookAt);

            gridMaterial.uniforms.time.value = time;
            sphereMaterial.uniforms.time.value = time;

            sphere.position.y = -6 + Math.sin(time * 0.8) * 0.2; // Animate above grid, below camera center
            sphere.rotation.y = time * 0.1;

            controls.update();
            composer.render();

            if (!hasRendered) {
                hasRendered = true;
                onReady?.();
            }
        }

        function animate() {
            const animationId = requestAnimationFrame(animate);

            if (!document.hidden) {
                renderFrame();
            }

            if (sceneRef.current) {
                sceneRef.current.animationId = animationId;
            }
        }

        sceneRef.current = {
            scene,
            camera,
            renderer,
            composer,
            controls,
            gridMaterial,
            sphereMaterial,
            sphere,
            clock,
            animationId: 0
        };

        if (reduceMotion) {
            renderFrame();
        } else {
            animate();
        }

        // Resize handler
        const handleResize = () => {
            if (!sceneRef.current) return;

            const { camera, renderer, composer } = sceneRef.current;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId);
                sceneRef.current.renderer.dispose();
                sceneRef.current.composer.dispose();
            }
            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [onError, onReady, reduceMotion]);

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
