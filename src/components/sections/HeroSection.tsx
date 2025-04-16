import { ScrollAnimation } from "../utils/ScrollAnimation";
import { PixelButton } from "../ui/PixelButton";

export const HeroSection = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 pb-20">
      <ScrollAnimation
        animationClass="anim-zoom-bounce"
        threshold={0.2}
        delay={300}
      >
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
            CREATIVE DESIGNING
          </span>
        </h1>
      </ScrollAnimation>

      <ScrollAnimation
        animationClass="anim-slide-up"
        threshold={0.2}
        delay={500}
      >
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
          Transform your ideas into stunning digital experiences. Our creative team brings your vision to life with pixel-perfect precision and innovative design solutions.
        </p>
      </ScrollAnimation>

      <ScrollAnimation
        animationClass="anim-fade-in"
        threshold={0.2}
        delay={700}
      >
        <div className="flex flex-wrap justify-center gap-6">
          <PixelButton
            text="Get Started"
            className="bg-purple-600 border-purple-700"
          />
          <PixelButton
            text="View Portfolio"
            className="bg-blue-600 border-blue-700"
          />
        </div>
      </ScrollAnimation>
    </section>
  );
};
