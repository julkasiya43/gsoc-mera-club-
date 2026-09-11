import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RevealOnScroll() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(
                (element) => element.classList.add('is-revealed'),
            );
            return;
        }

        const observedElements = new WeakSet<Element>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.01, rootMargin: '0px 0px 50px 0px' },
        );

        const observeRevealElements = (root: ParentNode) => {
            root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
                if (observedElements.has(element)) return;

                observedElements.add(element);
                observer.observe(element);
            });
        };

        observeRevealElements(document);

        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;

                    if (node.matches('[data-reveal]') && !observedElements.has(node)) {
                        observedElements.add(node);
                        observer.observe(node);
                    }

                    observeRevealElements(node);
                });
            });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            mutationObserver.disconnect();
            observer.disconnect();
        };
    }, [pathname]);

    return null;
}
