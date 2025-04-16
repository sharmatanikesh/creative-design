import { useRef, useEffect } from "react";
import { applyPixelEffect } from "../utils/PixelEffect";
import Link from "next/link";

interface NavItemProps {
  text: string;
  delay?: number;
  index: number;
  href: string;
}

export const NavItem = ({ text, index, href }: NavItemProps) => {
  const itemRef = useRef(null);
  const animationDelay = index * 200;

  useEffect(() => {
    applyPixelEffect(itemRef.current);
  }, []);

  const isHashLink = href.startsWith("#");

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
      {isHashLink ? (
        <a
          href={href}
          className="hover:border-b-2 hover:border-purple-400 pb-1"
        >
          {text}
        </a>
      ) : (
        <Link
          href={href}
          className="hover:border-b-2 hover:border-purple-400 pb-1"
        >
          {text}
        </Link>
      )}
    </li>
  );
};
