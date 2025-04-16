import { useRef, useState, useEffect } from "react";

interface PlanetProps {
  color: string;
  size: number;
  topPos: number;
  leftPos: number;
  delay: number;
  parallaxFactor?: number;
}

export const Planet = ({
  color,
  size,
  topPos,
  leftPos,
  delay,
  parallaxFactor = 0.05,
}: PlanetProps) => {
  const planetRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxY = scrollY * parallaxFactor;
  const parallaxX = scrollY * (parallaxFactor * 0.3) * (leftPos > 50 ? 1 : -1);

  return (
    <div
      ref={planetRef}
      className={`absolute ${color} opacity-80 rounded-full pixelated pulse-glow`}
      style={{
        top: `${topPos}%`,
        left: `${leftPos}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        animationDelay: `${delay}ms`,
        animation: `float 8s ease-in-out infinite, pulse-glow ${
          5 + (size % 5)
        }s infinite`,
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
        transition: "transform 0.2s ease-out",
      }}
    >
      <div
        className="absolute w-1/4 h-1/4 bg-black bg-opacity-30 rounded-full"
        style={{ top: "20%", left: "30%" }}
      ></div>
      <div
        className="absolute w-1/5 h-1/5 bg-black bg-opacity-20 rounded-full"
        style={{ top: "60%", left: "20%" }}
      ></div>
      <div
        className="absolute w-1/6 h-1/6 bg-black bg-opacity-25 rounded-full"
        style={{ top: "40%", left: "70%" }}
      ></div>
    </div>
  );
};
