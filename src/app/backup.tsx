"use client";

import { useState, useEffect, useRef } from "react";

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

// Function to apply pixel effects
interface PixelEffectElement extends HTMLElement {
  style: CSSStyleDeclaration;
}

const createPixelEffect = (element: PixelEffectElement | null): void => {
  if (element && element.style) {
    element.style.imageRendering = "pixelated";
    element.style.imageRendering = "crisp-edges";
  }
};

// Alias for compatibility
const applyPixelEffect = createPixelEffect;

// Star component with deterministic position and twinkling effect
interface StarProps {
  index: number;
  className?: string;
}

const Star = ({ index, className = "" }: StarProps) => {
  // Deterministic size and position based on index
  const size = (index % 3) + 1;
  // Create a deterministic but distributed pattern for stars
  const top = (index * 7919) % 100; // Using prime numbers to distribute
  const left = (index * 6997) % 100;
  const delay = 1000 + ((index * 127) % 4000);

  // Add slight movement to some stars
  const hasMovement = index % 5 === 0;

  return (
    <div
      className={`absolute bg-white pixelated ${className}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animation: hasMovement
          ? `twinkle ${delay}ms ease-in-out infinite, pixel-wave ${
              3 + (index % 4)
            }s ease-in-out infinite`
          : `twinkle ${delay}ms ease-in-out infinite`,
      }}
    />
  );
};

// Planet component
interface PlanetProps {
  color: string;
  size: number;
  topPos: number;
  leftPos: number;
  delay: number;
}

const Planet = ({ color, size, topPos, leftPos, delay }: PlanetProps) => {
  return (
    <div
      className={`absolute ${color} opacity-80 rounded-full pixelated pulse-glow`}
      style={{
        top: `${topPos}%`,
        left: `${leftPos}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}ms`,
        animation: `float 8s ease-in-out infinite, pulse-glow ${
          5 + (size % 5)
        }s infinite`,
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
      }}
    >
      {/* Pixelated craters or features */}
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

// Pixel Button component
interface PixelButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const PixelButton = ({ text, onClick, className = "" }: PixelButtonProps) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    applyPixelEffect(buttonRef.current);
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
}

const FeatureCard = ({
  title,
  description,
  icon,
  delay = 0,
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyPixelEffect(cardRef.current);
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
        animation: `slideUp 800ms ease-out forwards`,
        animationDelay: `${delay}ms`,
        opacity: 0,
        boxShadow: "0 0 10px rgba(111, 76, 255, 0.2)",
        transform: "scale(1)",
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

const IndexPage = () => {
  const [loading, setLoading] = useState(true);
  const [showStars] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Apply pixel effects to DOM elements after render and after loading completes
  useEffect(() => {
    if (!loading) {
      const pixelTimer = setTimeout(() => {
        document.querySelectorAll(".pixelated").forEach((el) => {
          // Cast the Element to PixelEffectElement before passing to createPixelEffect
          createPixelEffect(el as PixelEffectElement);
        });
      }, 100);

      return () => {
        clearTimeout(pixelTimer);
      };
    }
  }, [loading]);

  const renderStars = () => {
    // Create stars with keys directly tied to their index
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push(<Star key={`star-${i}`} index={i} />);
    }
    return stars;
  };

  const renderPlanets = () => {
    return (
      <>
        <Planet
          color="bg-purple-500"
          size={60}
          topPos={20}
          leftPos={15}
          delay={200}
        />
        <Planet
          color="bg-red-400"
          size={30}
          topPos={70}
          leftPos={80}
          delay={400}
        />
        <Planet
          color="bg-yellow-300"
          size={40}
          topPos={60}
          leftPos={20}
          delay={600}
        />
        <Planet
          color="bg-green-400"
          size={25}
          topPos={30}
          leftPos={75}
          delay={800}
        />
      </>
    );
  };

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
            style={{ animation: "orbit 15s linear infinite" }}
          />
          <div
            className="absolute top-2/3 left-1/4 w-3 h-3 bg-blue-400 rounded-full"
            style={{ animation: "orbit 20s linear infinite reverse" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full"
            style={{ animation: "orbit 10s linear infinite" }}
          />
        </>
      )}

      {/* Scanline effect */}
      <div className="scanline"></div>

      {/* Loading Screen */}
      {loading ? (
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 relative pixelated mr-3">
              <svg
                width="48"
                height="48"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="8" height="8" x="16" y="4" fill="#a855f7" />
                <rect width="8" height="8" x="8" y="12" fill="#a855f7" />
                <rect width="8" height="8" x="16" y="12" fill="#38bdf8" />
                <rect width="8" height="8" x="24" y="12" fill="#a855f7" />
                <rect width="8" height="8" x="16" y="20" fill="#a855f7" />
                <rect width="8" height="8" x="8" y="20" fill="#38bdf8" />
                <rect width="8" height="8" x="24" y="20" fill="#38bdf8" />
                <rect width="8" height="8" x="0" y="28" fill="#a855f7" />
                <rect width="8" height="8" x="8" y="28" fill="#a855f7" />
                <rect width="8" height="8" x="16" y="28" fill="#a855f7" />
                <rect width="8" height="8" x="24" y="28" fill="#a855f7" />
                <rect width="8" height="8" x="32" y="28" fill="#a855f7" />
              </svg>
            </div>
            <h1 className="text-4xl font-pixel text-white animate-pulse">
              <span className="text-purple-400">PIXEL</span> SPACE
            </h1>
          </div>
          <div className="w-64 h-3 bg-gray-800 rounded overflow-hidden pixelated">
            <div
              className="h-full bg-purple-500 pixelated"
              style={{ width: "100%", animation: "slideRight 2s ease-out" }}
            ></div>
          </div>
          <p className="mt-4 text-blue-300 font-pixel">Initializing...</p>
        </div>
      ) : (
        <>
          {/* Header/Navigation */}
          <header className="w-full py-6 px-8 flex justify-between items-center z-10 relative">
            <div
              className="flex items-center opacity-0"
              style={{ animation: `fadeIn 600ms ease-out forwards` }}
            >
              <div className="w-10 h-10 relative pixelated mr-3">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="8" height="8" x="16" y="4" fill="#a855f7" />
                  <rect width="8" height="8" x="8" y="12" fill="#a855f7" />
                  <rect width="8" height="8" x="16" y="12" fill="#38bdf8" />
                  <rect width="8" height="8" x="24" y="12" fill="#a855f7" />
                  <rect width="8" height="8" x="16" y="20" fill="#a855f7" />
                  <rect width="8" height="8" x="8" y="20" fill="#38bdf8" />
                  <rect width="8" height="8" x="24" y="20" fill="#38bdf8" />
                  <rect width="8" height="8" x="0" y="28" fill="#a855f7" />
                  <rect width="8" height="8" x="8" y="28" fill="#a855f7" />
                  <rect width="8" height="8" x="16" y="28" fill="#a855f7" />
                  <rect width="8" height="8" x="24" y="28" fill="#a855f7" />
                  <rect width="8" height="8" x="32" y="28" fill="#a855f7" />
                </svg>
              </div>
              <h1 className="text-2xl font-pixel text-white">
                <span className="text-purple-400">PIXEL</span> SPACE
              </h1>
            </div>

            <nav>
              <ul className="flex space-x-8">
                <NavItem text="Home" index={0} />
                <NavItem text="Features" index={1} />
                <NavItem text="Gallery" index={2} />
                <NavItem text="Contact" index={3} />
              </ul>
            </nav>
          </header>

          {/* Hero Section */}
          <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 pb-20">
            <ContentSection delay={300} className="text-center">
              <h1 className="text-6xl md:text-7xl font-pixel text-white mb-6">
                <span
                  className="inline-block pixelated"
                  style={{ animation: "glitch 5s infinite", color: "#a855f7" }}
                >
                  EXPLORE
                </span>{" "}
                <span className="pixel-wave-text">
                  {["T", "H", "E"].map((letter, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                      {letter}
                    </span>
                  ))}
                </span>
                <span className="block text-blue-300 color-shift">
                  PIXEL UNIVERSE
                </span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
                Journey through an intergalactic adventure in a retro-futuristic
                pixelated cosmos. Discover new worlds and push the boundaries of
                imagination.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <PixelButton
                  text="Start Mission"
                  className="bg-purple-600 border-purple-700"
                />
                <PixelButton
                  text="View Gallery"
                  className="bg-blue-600 border-blue-700"
                />
              </div>
            </ContentSection>

            {/* Floating spaceship */}
            <div
              className="absolute right-10 bottom-20 w-40 h-20 opacity-0 pixelated"
              style={{
                animation: `float 6s ease-in-out infinite, fadeIn 1s ease-out forwards`,
                animationDelay: "0s, 1000ms",
                transform: "rotate(-15deg)",
              }}
            >
              <svg
                width="160"
                height="80"
                viewBox="0 0 160 80"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Spaceship body */}
                <rect x="40" y="30" width="80" height="20" fill="#6366f1" />
                <rect x="30" y="40" width="100" height="10" fill="#6366f1" />
                <rect x="20" y="50" width="120" height="10" fill="#818cf8" />

                {/* Cockpit */}
                <rect x="60" y="20" width="40" height="10" fill="#38bdf8" />

                {/* Engines */}
                <rect x="20" y="50" width="10" height="15" fill="#f43f5e" />
                <rect x="130" y="50" width="10" height="15" fill="#f43f5e" />

                {/* Engine flames */}
                <rect x="15" y="65" width="20" height="5" fill="#fb923c" />
                <rect x="125" y="65" width="20" height="5" fill="#fb923c" />

                {/* Windows */}
                <rect x="50" y="35" width="10" height="5" fill="#38bdf8" />
                <rect x="70" y="35" width="10" height="5" fill="#38bdf8" />
                <rect x="90" y="35" width="10" height="5" fill="#38bdf8" />
              </svg>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 md:px-10 relative">
            <ContentSection delay={600} className="text-center mb-16">
              <h2 className="text-4xl font-pixel text-white mb-6">
                <span className="text-yellow-300">PIXEL</span> FEATURES
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Discover the unique aspects of our pixelated space adventure
              </p>
            </ContentSection>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                title="Explore Planets"
                description="Discover pixelated worlds with unique landscapes and inhabitants across the pixel universe."
                icon="🪐"
                delay={700}
              />
              <FeatureCard
                title="Space Battles"
                description="Engage in epic space combat with retro graphics and strategic gameplay elements."
                icon="👾"
                delay={800}
              />
              <FeatureCard
                title="Resource Mining"
                description="Gather valuable space materials to upgrade your ship and abilities."
                icon="⛏️"
                delay={900}
              />
              <FeatureCard
                title="Alien Encounters"
                description="Meet pixelated extraterrestrial beings and form alliances or rivalries."
                icon="👽"
                delay={1000}
              />
              <FeatureCard
                title="Space Trading"
                description="Buy, sell and trade resources with other explorers across the pixel galaxy."
                icon="💰"
                delay={1100}
              />
              <FeatureCard
                title="Galaxy Mapping"
                description="Chart unexplored regions and share your discoveries with the community."
                icon="🗺️"
                delay={1200}
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 relative">
            <ContentSection
              delay={1200}
              className="max-w-4xl mx-auto bg-opacity-30 bg-blue-900 backdrop-filter backdrop-blur-sm p-10 rounded-lg pixelated border-2 border-blue-500 text-center pulse-glow"
            >
              <h2 className="text-3xl font-pixel text-white mb-6">
                READY TO <span className="text-purple-300">LAUNCH?</span>
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of explorers already mapping the pixel universe
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <PixelButton
                  text="Join Now"
                  className="bg-green-600 border-green-700"
                />
                <PixelButton
                  text="Learn More"
                  className="bg-gray-600 border-gray-700"
                />
              </div>

              {/* Countdown */}
              <div className="mt-10">
                <Countdown />
              </div>
            </ContentSection>
          </section>

          {/* Footer */}
          <footer className="py-10 px-4 border-t border-blue-800">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div
                className="flex items-center mb-6 md:mb-0 opacity-0"
                style={{ animation: `fadeIn 600ms ease-out forwards` }}
              >
                <div className="w-8 h-8 relative pixelated mr-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="8" height="8" x="16" y="4" fill="#a855f7" />
                    <rect width="8" height="8" x="8" y="12" fill="#a855f7" />
                    <rect width="8" height="8" x="16" y="12" fill="#38bdf8" />
                    <rect width="8" height="8" x="24" y="12" fill="#a855f7" />
                    <rect width="8" height="8" x="16" y="20" fill="#a855f7" />
                    <rect width="8" height="8" x="8" y="20" fill="#38bdf8" />
                    <rect width="8" height="8" x="24" y="20" fill="#38bdf8" />
                    <rect width="8" height="8" x="0" y="28" fill="#a855f7" />
                    <rect width="8" height="8" x="8" y="28" fill="#a855f7" />
                    <rect width="8" height="8" x="16" y="28" fill="#a855f7" />
                    <rect width="8" height="8" x="24" y="28" fill="#a855f7" />
                    <rect width="8" height="8" x="32" y="28" fill="#a855f7" />
                  </svg>
                </div>
                <h1 className="text-xl font-pixel text-white">
                  <span className="text-purple-400">PIXEL</span> SPACE
                </h1>
              </div>

              <div className="text-center md:text-right">
                <p className="text-blue-300 text-sm">
                  © 2025 Pixel Space. All rights reserved.
                </p>
                <p className="text-blue-400 text-xs mt-2">
                  Designed for space explorers and pixel enthusiasts
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default IndexPage;
