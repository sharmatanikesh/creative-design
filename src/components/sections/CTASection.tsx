import { ScrollAnimation } from "../utils/ScrollAnimation";
import { PixelButton } from "../ui/PixelButton";
import { Countdown } from "../ui/Countdown";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 relative">
      <ScrollAnimation animationClass="anim-zoom" threshold={0.2} delay={200}>
        <div className="max-w-4xl mx-auto bg-opacity-30 bg-blue-900 backdrop-filter backdrop-blur-sm p-10 rounded-lg pixelated border-2 border-blue-500 text-center pulse-glow">
          <h2 className="text-3xl font-pixel text-white mb-6">
            READY TO <span className="text-purple-300">CREATE?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our growing list of satisfied clients who have transformed
            their digital presence
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <PixelButton
              text="Start Project"
              className="bg-green-600 border-green-700"
            />
            <PixelButton
              text="Contact Us"
              className="bg-gray-600 border-gray-700"
            />
          </div>

          <div className="mt-10">
            <Countdown />
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};
