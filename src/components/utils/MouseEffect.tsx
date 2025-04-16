import { useEffect, useState } from "react";

export const MouseEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
        return newTrail.slice(-10); // Keep only the last 10 positions
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Trail effect */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="fixed w-2 h-2 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full pointer-events-none z-40 mix-blend-difference"
          style={{
            transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
            opacity: index / trail.length,
            transition: "transform 0.1s ease-out",
          }}
        />
      ))}

      {/* Glow effect */}
      <div
        className="fixed w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full pointer-events-none z-30 blur-xl"
        style={{
          transform: `translate(${position.x - 64}px, ${position.y - 64}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />
    </>
  );
};
