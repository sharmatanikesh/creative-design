import { useRef, useState, useEffect } from "react";

interface StarProps {
  index: number;
  className?: string;
  parallax?: boolean;
}

export const Star = ({
  index,
  className = "",
  parallax = false,
}: StarProps) => {
  const size = (index % 3) + 1;
  const top = (index * 7919) % 100;
  const left = (index * 6997) % 100;
  const delay = 1000 + ((index * 127) % 4000);

  const hasMovement = index % 5 === 0;
  const starRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax]);

  const parallaxFactor = parallax ? (index % 5) * 0.02 + 0.01 : 0;
  const parallaxY = parallax ? scrollY * parallaxFactor : 0;

  return (
    <div
      ref={starRef}
      className={`absolute bg-white pixelated ${className}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: parallax ? `translateY(${parallaxY}px)` : "none",
        animation: hasMovement
          ? `twinkle ${delay}ms ease-in-out infinite, pixel-wave ${
              3 + (index % 4)
            }s ease-in-out infinite`
          : `twinkle ${delay}ms ease-in-out infinite`,
        transition: "transform 0.1s linear",
      }}
    />
  );
};
