import { useState, useEffect, useCallback, type RefObject } from 'react';

interface ScrollAnimationResult {
    scrollProgress: number;
    isAnimationComplete: boolean;
}

/**
 * Custom hook that hijacks scroll events to drive a camera animation.
 * Accumulates wheel delta until a threshold is reached, then releases scroll.
 * 
 * @param containerRef - Ref to the element that should capture scroll events
 * @param scrollThreshold - Total scroll distance needed to complete animation (default: 800)
 * @returns { scrollProgress: 0-1, isAnimationComplete: boolean }
 */
export function useScrollAnimation(
    containerRef: RefObject<HTMLElement | null>,
    scrollThreshold: number = 3200
): ScrollAnimationResult {
    const [accumulatedScroll, setAccumulatedScroll] = useState(0);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );

    const scrollProgress = reduceMotion ? 0 : Math.min(accumulatedScroll / scrollThreshold, 1);

    const handleWheel = useCallback((event: WheelEvent) => {
        // If animation is complete and we're scrolling down, allow normal scroll
        if (isAnimationComplete && event.deltaY > 0) {
            return;
        }

        // If we're at the top and scrolling up past the animation, allow reverse
        if (accumulatedScroll <= 0 && event.deltaY < 0) {
            return;
        }

        // Prevent default scroll behavior during animation
        event.preventDefault();

        setAccumulatedScroll(prev => {
            const newValue = prev + event.deltaY;

            // Clamp between 0 and threshold
            const clampedValue = Math.max(0, Math.min(newValue, scrollThreshold));

            // Check if animation just completed
            if (clampedValue >= scrollThreshold && !isAnimationComplete) {
                setIsAnimationComplete(true);
            } else if (clampedValue < scrollThreshold && isAnimationComplete) {
                setIsAnimationComplete(false);
            }

            return clampedValue;
        });
    }, [scrollThreshold, isAnimationComplete, accumulatedScroll]);

    // Handle scroll position when returning to hero section
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        // If hero section is back in view from below and animation was complete
        if (rect.top >= 0 && isAnimationComplete && window.scrollY === 0) {
            // Reset animation state when scrolled back to top
            setIsAnimationComplete(false);
            setAccumulatedScroll(scrollThreshold);
        }
    }, [containerRef, isAnimationComplete, scrollThreshold]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (reduceMotion) return;

        const container = containerRef.current;
        if (!container) return;

        // Use passive: false to allow preventDefault
        container.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [containerRef, handleWheel, handleScroll, reduceMotion]);

    return {
        scrollProgress,
        isAnimationComplete
    };
}
