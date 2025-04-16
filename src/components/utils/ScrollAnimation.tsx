import { useRef, useState, useEffect } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  animationClass: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export const ScrollAnimation = ({
  children,
  animationClass,
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
}: ScrollAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ${
        isVisible ? animationClass : "opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
