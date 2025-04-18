"use client";

import { useState, useEffect, useCallback } from "react";
import { createPixelEffect } from "../components/utils/PixelEffect";
import { Star } from "../components/space/Star";
import { Planet } from "../components/space/Planet";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { LoadingScreen } from "../components/layout/LoadingScreen";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturesPage } from "../components/sections/FeaturesPage";
import { GalleryPage } from "../components/sections/GalleryPage";
import { ContactSection } from "../components/sections/ContactSection";
import { MouseEffect } from "../components/utils/MouseEffect";


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
          color="bg-gradient-to-r from-cyan-500 to-blue-500"
          size={60}
          topPos={20}
          leftPos={15}
          delay={200}
          parallaxFactor={0.05}
        />
        <Planet
          color="bg-gradient-to-r from-rose-500 to-pink-500"
          size={30}
          topPos={70}
          leftPos={80}
          delay={400}
          parallaxFactor={0.08}
        />
        <Planet
          color="bg-gradient-to-r from-amber-500 to-yellow-500"
          size={40}
          topPos={60}
          leftPos={20}
          delay={600}
          parallaxFactor={0.03}
        />
        <Planet
          color="bg-gradient-to-r from-emerald-500 to-teal-500"
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
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden relative">
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
          cursor: none;
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
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
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

        /* New animations */
        @keyframes float-rotate {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }

        @keyframes glow-pulse {
          0%,
          100% {
            filter: drop-shadow(0 0 5px rgba(56, 189, 248, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(56, 189, 248, 0.8));
          }
        }

        .glow-pulse {
          animation: glow-pulse 2s infinite ease-in-out;
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.8);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <MouseEffect />

      {showStars && (
        <div className="fixed inset-0 overflow-hidden">
          {renderStars()}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/20 to-transparent"></div>
        </div>
      )}

      {!loading && (
        <div className="fixed inset-0 pointer-events-none">
          {renderPlanets()}
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-glow"></div>
          <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full animate-pulse"></div>
        </div>
      )}

      <div className="scanline"></div>

      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="relative z-10">
          <Header scrollY={scrollY} />
          <main className="space-y-32">
            <HeroSection />
            <FeaturesPage />
            <GalleryPage />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default IndexPage;
