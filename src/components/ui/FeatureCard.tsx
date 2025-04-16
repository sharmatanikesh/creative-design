import { useRef, useState, useEffect } from "react";
import { applyPixelEffect } from "../utils/PixelEffect";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
  index?: number;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  index = 0,
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    applyPixelEffect(cardRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "scale(1.05)";
      cardRef.current.style.boxShadow =
        "0 0 20px rgba(139, 92, 246, 0.7), 0 0 30px rgba(56, 189, 248, 0.4)";
      cardRef.current.style.borderColor = "#93c5fd";
    }

    if (iconRef.current) {
      iconRef.current.style.transform = "scale(1.2) rotate(5deg)";
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "scale(1)";
      cardRef.current.style.boxShadow = "0 0 10px rgba(111, 76, 255, 0.2)";
      cardRef.current.style.borderColor = "#3b82f6";
    }

    if (iconRef.current) {
      iconRef.current.style.transform = "scale(1) rotate(0deg)";
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-opacity-20 bg-blue-900 backdrop-filter backdrop-blur-sm p-6 rounded-lg pixelated border-2 border-blue-500 pixel-in group"
      style={{
        opacity: 0,
        transform: `translateY(50px)`,
        animation: isInView
          ? `slideUp 800ms ease-out forwards ${index * 150}ms`
          : "none",
        boxShadow: "0 0 10px rgba(111, 76, 255, 0.2)",
        transition:
          "transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67), box-shadow 0.3s ease, border-color 0.3s ease",
        willChange: "transform, box-shadow, border-color",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center mb-3">
        <div
          ref={iconRef}
          className="text-4xl mr-3 text-purple-300"
          style={{
            transition: "transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
            willChange: "transform",
          }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-pixel text-white">{title}</h3>
      </div>
      <p className="text-blue-100 font-light">{description}</p>
    </div>
  );
};
