import React, { useState, useRef, useEffect } from 'react';

const useOnScreen = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible] as const;
};


const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // FIX: Removed `triggerOnce` as it's not a valid property for IntersectionObserverInit.
    // The one-time trigger logic is already handled by `observer.unobserve()` in the `useOnScreen` hook.
    const [ref, isVisible] = useOnScreen({
        threshold: 0.2,
    });

    return (
        <div
            ref={ref}
            className={`animated-section ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;