import { useRef, useEffect } from "react";
import { applyPixelEffect } from "../utils/PixelEffect";

interface NavItemProps {
  text: string;
  delay?: number;
  index: number;
}

export const NavItem = ({ text, index }: NavItemProps) => {
  const itemRef = useRef(null);
  const animationDelay = index * 200;

  useEffect(() => {
    applyPixelEffect(itemRef.current);
  }, []);

  return (
    <li
      ref={itemRef}
      className="relative cursor-pointer font-pixel text-lg text-white hover:text-purple-300 transition-all duration-300"
      style={{
        animation: `slideDown 600ms ease-out forwards`,
        animationDelay: `${animationDelay}ms`,
        opacity: 0,
      }}
    >
      <span className="hover:border-b-2 hover:border-purple-400 pb-1">
        {text}
      </span>
    </li>
  );
};
