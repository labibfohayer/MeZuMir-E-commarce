import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'scale' | 'none';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 700,
  direction = 'up',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    // Immediately reveal if element is already within or near visible viewport
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1000;
    const rect = el.getBoundingClientRect();
    if (rect.top <= viewportHeight * 1.2) {
      setIsRevealed(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '120px 0px 120px 0px',
      }
    );

    observer.observe(el);

    // Fallback safety: reveal after a short window so content is never stuck hidden
    const safetyTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 600 + delay);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [delay]);

  const getTransformStyle = () => {
    if (isRevealed) {
      return 'opacity-100 translate-y-0 scale-100';
    }
    if (direction === 'scale') {
      return 'opacity-0 translate-y-6 scale-[0.97]';
    }
    return 'opacity-0 translate-y-8';
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transform transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${getTransformStyle()} ${className}`}
    >
      {children}
    </div>
  );
};
