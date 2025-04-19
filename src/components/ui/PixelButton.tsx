import { useRef, useEffect } from "react";
import { applyPixelEffect } from "../utils/PixelEffect";

interface PixelButtonProps {
  text: string;
  className?: string;
}

export const PixelButton = ({ text, className = "" }: PixelButtonProps) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    applyPixelEffect(buttonRef.current);
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`px-6 py-3 border-4 border-indigo-700 bg-indigo-600 hover:bg-indigo-500 
      text-white font-pixel uppercase tracking-wider transform hover:scale-105 
      transition-all duration-300 pixelated ${className}`}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)" }}
    >
      {text}
    </button>
  );
};
