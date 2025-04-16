"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPixelEffect } from "../components/utils/PixelEffect";
import { Star } from "../components/space/Star";
import { Planet } from "../components/space/Planet";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { LoadingScreen } from "../components/layout/LoadingScreen";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { CTASection } from "../components/sections/CTASection";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = {
  commentary:
    "To create an animated, space-themed landing page with pixelated elements and creative transitions, we'll use a combination of CSS animations, React state, and Tailwind classes. We'll start with a basic layout and then add animations and transitions to each element.",
  template: "nextjs-developer",
  title: "Space Landing",
  description:
    "An animated, space-themed landing page with pixelated elements and creative transitions.",
  additional_dependencies: [],
  has_additional_dependencies: false,
  install_dependencies_command: "",
  port: 3000,
  file_path: "pages/index.tsx",
};

// ScrollAnimation component to trigger animations on scroll
interface ScrollAnimationProps {
  children: React.ReactNode;
  animationClass: string; // CSS class to apply when visible
  delay?: number;
  threshold?: number; // Visibility threshold (0-1)
  rootMargin?: string; // Margin around the root
}

const ScrollAnimation = ({
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
          // Once visible, disconnect the observer
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

// Pixel Button component
interface PixelButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const PixelButton = ({ text, onClick, className = "" }: PixelButtonProps) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    createPixelEffect(buttonRef.current);
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`px-6 py-3 border-4 border-indigo-700 bg-indigo-600 hover:bg-indigo-500 
      text-white font-pixel uppercase tracking-wider transform hover:scale-105 
      transition-all duration-300 pixelated ${className}`}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)" }}
    >
      {text}
    </button>
  );
};

// Navigation Item
interface NavItemProps {
  text: string;
  delay?: number;
  index: number;
}

const NavItem = ({ text, index }: NavItemProps) => {
  const itemRef = useRef(null);
  const animationDelay = index * 200; // Deterministic delay

  useEffect(() => {
    createPixelEffect(itemRef.current);
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

// Countdown component
const Countdown = () => {
  // Start with zeros for consistent server rendering
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Update with actual starting values after client-side hydration
    setTime({
      days: 7,
      hours: 12,
      minutes: 45,
      seconds: 30,
    });
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Only run timer on client side

    const timer = setInterval(() => {
      // Simple countdown logic (same as before)
      setTime((prevTime) => {
        const newTime = { ...prevTime };

        newTime.seconds -= 1;
        if (newTime.seconds < 0) {
          newTime.seconds = 59;
          newTime.minutes -= 1;

          if (newTime.minutes < 0) {
            newTime.minutes = 59;
            newTime.hours -= 1;

            if (newTime.hours < 0) {
              newTime.hours = 23;
              newTime.days -= 1;
            }
          }
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]); // Only run when isClient changes (after hydration)

  return (
    <div className="flex justify-center gap-6">
      {Object.entries(time).map(([unit, value]) => (
        <div key={unit} className="bg-black bg-opacity-50 p-4 pixelated">
          <div className="text-2xl font-pixel text-yellow-300">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-300">{unit.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
};

// Content Section
interface ContentSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContentSection = ({
  children,
  delay = 0,
  className = "",
}: ContentSectionProps) => {
  return (
    <div
      className={`${className} opacity-0`}
      style={{
        animation: `fadeIn 800ms ease-out forwards`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Feature Card
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
  index?: number;
}

const FeatureCard = ({
  title,
  description,
  icon,
  index = 0,
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    createPixelEffect(cardRef.current);
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
      // Apply faster transition with cubic-bezier for a snappier feel
      cardRef.current.style.transform = "scale(1.05)";
      cardRef.current.style.boxShadow =
        "0 0 20px rgba(139, 92, 246, 0.7), 0 0 30px rgba(56, 189, 248, 0.4)";
      cardRef.current.style.borderColor = "#93c5fd"; // lighter blue for hover state
    }

    // Also animate the icon for a coordinated effect
    if (iconRef.current) {
      iconRef.current.style.transform = "scale(1.2) rotate(5deg)";
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "scale(1)";
      cardRef.current.style.boxShadow = "0 0 10px rgba(111, 76, 255, 0.2)";
      cardRef.current.style.borderColor = "#3b82f6"; // reset to original border color
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

// Parallax Text component for scroll-based text effects
interface ParallaxTextProps {
  children: React.ReactNode;
  baseSpeed?: number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ParallaxText = ({
  children,
  baseSpeed = 0.1,
  direction = "left",
  className = "",
}: ParallaxTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;
      const scrollPosition = window.scrollY;
      const elementPosition = textRef.current.offsetTop;
      const relativePosition = scrollPosition - elementPosition;
      setOffset(relativePosition * baseSpeed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [baseSpeed]);

  // Calculate transform based on direction
  const getTransform = () => {
    switch (direction) {
      case "left":
        return `translateX(${-offset}px)`;
      case "right":
        return `translateX(${offset}px)`;
      case "up":
        return `translateY(${-offset}px)`;
      case "down":
        return `translateY(${offset}px)`;
      default:
        return `translateX(${-offset}px)`;
    }
  };

  return (
    <div
      ref={textRef}
      className={`transition-transform ${className}`}
      style={{
        transform: getTransform(),
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

const IndexPage = () => {
  const [loading, setLoading] = useState(true);
  const [showStars] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) {
      const pixelTimer = setTimeout(() => {
        document.querySelectorAll(".pixelated").forEach((el) => {
          createPixelEffect(el as HTMLElement);
        });
      }, 100);

      return () => {
        clearTimeout(pixelTimer);
      };
    }
  }, [loading]);

  const renderStars = useCallback(() => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const hasParallax = i % 2 === 0;
      stars.push(<Star key={`star-${i}`} index={i} parallax={hasParallax} />);
    }
    return stars;
  }, []);

  const renderPlanets = useCallback(() => {
    return (
      <>
        <Planet
          color="bg-purple-500"
          size={60}
          topPos={20}
          leftPos={15}
          delay={200}
          parallaxFactor={0.05}
        />
        <Planet
          color="bg-red-400"
          size={30}
          topPos={70}
          leftPos={80}
          delay={400}
          parallaxFactor={0.08}
        />
        <Planet
          color="bg-yellow-300"
          size={40}
          topPos={60}
          leftPos={20}
          delay={600}
          parallaxFactor={0.03}
        />
        <Planet
          color="bg-green-400"
          size={25}
          topPos={30}
          leftPos={75}
          delay={800}
          parallaxFactor={0.07}
        />
      </>
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-blue-900 to-purple-900 overflow-hidden relative">
      {/* CSS Animations */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        @font-face {
          font-family: "Pixel";
          src: url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
          font-display: swap;
        }

        :root {
          --pixel-size: 4px;
        }

        body {
          margin: 0;
          font-family: "Space Mono", monospace;
          overflow-x: hidden;
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><rect x='13' y='8' width='2' height='2' fill='%23a855f7'/><rect x='15' y='8' width='2' height='2' fill='%23a855f7'/><rect x='17' y='8' width='2' height='2' fill='%23a855f7'/><rect x='11' y='10' width='2' height='2' fill='%23a855f7'/><rect x='13' y='10' width='2' height='2' fill='%23ffffff'/><rect x='15' y='10' width='2' height='2' fill='%23ffffff'/><rect x='17' y='10' width='2' height='2' fill='%23ffffff'/><rect x='19' y='10' width='2' height='2' fill='%23a855f7'/><rect x='11' y='12' width='2' height='2' fill='%23a855f7'/><rect x='13' y='12' width='2' height='2' fill='%23ffffff'/><rect x='15' y='12' width='2' height='2' fill='%23a855f7'/><rect x='17' y='12' width='2' height='2' fill='%23ffffff'/><rect x='19' y='12' width='2' height='2' fill='%23a855f7'/><rect x='11' y='14' width='2' height='2' fill='%23a855f7'/><rect x='13' y='14' width='2' height='2' fill='%23ffffff'/><rect x='15' y='14' width='2' height='2' fill='%23ffffff'/><rect x='17' y='14' width='2' height='2' fill='%23ffffff'/><rect x='19' y='14' width='2' height='2' fill='%23a855f7'/><rect x='9' y='16' width='2' height='2' fill='%23a855f7'/><rect x='11' y='16' width='2' height='2' fill='%23a855f7'/><rect x='13' y='16' width='2' height='2' fill='%23a855f7'/><rect x='15' y='16' width='2' height='2' fill='%23a855f7'/><rect x='17' y='16' width='2' height='2' fill='%23a855f7'/><rect x='19' y='16' width='2' height='2' fill='%23a855f7'/><rect x='21' y='16' width='2' height='2' fill='%23a855f7'/><rect x='13' y='18' width='2' height='2' fill='%23a855f7'/><rect x='17' y='18' width='2' height='2' fill='%23a855f7'/><rect x='11' y='20' width='2' height='2' fill='%23a855f7'/><rect x='13' y='20' width='2' height='2' fill='%23a855f7'/><rect x='15' y='20' width='2' height='2' fill='%23a855f7'/><rect x='17' y='20' width='2' height='2' fill='%23a855f7'/><rect x='19' y='20' width='2' height='2' fill='%23a855f7'/></svg>")
              16 16,
            auto;
        }

        .font-pixel {
          font-family: "Press Start 2P", monospace;
          letter-spacing: 1px;
        }

        .pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
          box-shadow: 0 0 10px rgba(111, 76, 255, 0.5);
        }

        button.pixelated:hover,
        div.pixelated:hover {
          box-shadow: 0 0 15px rgba(111, 76, 255, 0.8);
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px) translateX(5px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.05);
            filter: brightness(1.2);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }

        .scanline {
          width: 100%;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.1);
          position: absolute;
          animation: scanline 6s linear infinite;
        }

        @keyframes scanline {
          0% {
            top: -5%;
          }
          100% {
            top: 105%;
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(70px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(70px) rotate(-360deg);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.9),
              0 0 60px rgba(56, 189, 248, 0.6);
          }
        }

        @keyframes pixelate-in {
          0% {
            filter: blur(10px);
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            filter: blur(5px);
            opacity: 0.5;
            transform: scale(0.9);
          }
          100% {
            filter: blur(0);
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes color-cycle {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }

        @keyframes pixel-wave {
          0%,
          100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-4px);
          }
          50% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(4px);
          }
        }

        .color-shift {
          animation: color-cycle 15s infinite linear;
        }

        .pixel-wave-text span {
          display: inline-block;
          animation: pixel-wave 2s infinite;
        }

        .pixel-wave-text span:nth-child(2n) {
          animation-delay: 0.1s;
        }

        .pixel-wave-text span:nth-child(3n) {
          animation-delay: 0.2s;
        }

        .pixel-wave-text span:nth-child(4n) {
          animation-delay: 0.3s;
        }

        .pixel-wave-text span:nth-child(5n) {
          animation-delay: 0.4s;
        }

        .pulse-glow {
          animation: pulse-glow 3s infinite;
        }

        .pixel-in {
          animation: pixelate-in 0.8s forwards;
        }
      `}</style>

      {/* Background Stars */}
      {showStars && renderStars()}

      {/* Planets */}
      {!loading && renderPlanets()}

      {/* Orbiting Pixels */}
      {!loading && (
        <>
          <div
            className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-500 rounded-full"
            style={{
              animation: "orbit 15s linear infinite",
              transformOrigin: `${15 + scrollY * 0.01}px ${
                -10 + scrollY * 0.005
              }px`,
            }}
          />
          <div
            className="absolute top-2/3 left-1/4 w-3 h-3 bg-blue-400 rounded-full"
            style={{
              animation: "orbit 20s linear infinite reverse",
              transformOrigin: `${-20 + scrollY * 0.015}px ${
                10 + scrollY * 0.01
              }px`,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full"
            style={{
              animation: "orbit 10s linear infinite",
              transformOrigin: `${5 - scrollY * 0.008}px ${
                -5 - scrollY * 0.003
              }px`,
            }}
          />
        </>
      )}

      {/* Scanline effect */}
      <div className="scanline"></div>

      {/* Loading Screen */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header scrollY={scrollY} />
          <HeroSection />
          <FeaturesSection />
          <CTASection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default IndexPage;
