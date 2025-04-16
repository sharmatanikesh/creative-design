import { ScrollAnimation } from "../utils/ScrollAnimation";
import { Star } from "../space/Star";
import { useState } from "react";

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
  delay: number;
}

const features: Feature[] = [
  {
    title: "Web Design",
    description:
      "Create stunning, responsive websites that captivate your audience and drive engagement.",
    icon: "🌐",
    color: "bg-purple-600",
    delay: 200,
  },
  {
    title: "UI/UX Design",
    description:
      "Craft intuitive user interfaces and seamless experiences that delight your users.",
    icon: "🎨",
    color: "bg-blue-600",
    delay: 300,
  },
  {
    title: "Brand Identity",
    description:
      "Develop a unique brand identity that stands out and resonates with your target audience.",
    icon: "✨",
    color: "bg-yellow-600",
    delay: 400,
  },
  {
    title: "Motion Graphics",
    description:
      "Bring your brand to life with dynamic animations and engaging motion design.",
    icon: "🎬",
    color: "bg-red-600",
    delay: 500,
  },
  {
    title: "Digital Marketing",
    description:
      "Boost your online presence with strategic digital marketing solutions.",
    icon: "📈",
    color: "bg-green-600",
    delay: 600,
  },
  {
    title: "Content Creation",
    description:
      "Produce compelling content that tells your brand's story and connects with your audience.",
    icon: "📝",
    color: "bg-pink-600",
    delay: 700,
  },
];

export const FeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background Stars */}
      {[...Array(50)].map((_, i) => (
        <Star key={i} index={i} parallax />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollAnimation animationClass="anim-zoom" threshold={0.2} delay={200}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-pixel text-white mb-6">
              <span className="text-purple-300">OUR</span> FEATURES
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover the comprehensive range of creative services we offer to
              bring your vision to life.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollAnimation
              key={index}
              animationClass="anim-flip"
              threshold={0.2}
              delay={feature.delay}
            >
              <div
                className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div
                  className={`absolute inset-0 ${feature.color} opacity-20 rounded-lg transform transition-all duration-300 group-hover:opacity-30`}
                />
                <div className="relative bg-opacity-30 bg-blue-900 backdrop-filter backdrop-blur-sm p-8 rounded-lg pixelated border-2 border-blue-500">
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:rotate-12`}
                  >
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-pixel text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100">{feature.description}</p>
                  <div className="mt-6">
                    <button className="px-6 py-2 bg-opacity-50 bg-blue-800 text-white font-pixel rounded-lg transition-all duration-300 hover:bg-opacity-70 pixelated border border-blue-600">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Feature Details Section */}
        {activeFeature !== null && (
          <ScrollAnimation
            animationClass="anim-fade-in"
            threshold={0.2}
            delay={0}
          >
            <div className="mt-16 bg-opacity-30 bg-blue-900 backdrop-filter backdrop-blur-sm p-8 rounded-lg pixelated border-2 border-blue-500">
              <h3 className="text-3xl font-pixel text-white mb-6">
                <span
                  className={features[activeFeature].color.replace(
                    "bg-",
                    "text-"
                  )}
                >
                  {features[activeFeature].title}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-blue-100 mb-6">
                    {features[activeFeature].description}
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Custom Solutions",
                      "Expert Team",
                      "Latest Technology",
                      "24/7 Support",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-blue-100">
                        <span
                          className={`w-2 h-2 ${features[activeFeature].color} rounded-full mr-3`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className={`w-32 h-32 ${features[activeFeature].color} rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110`}
                  >
                    <span className="text-6xl">
                      {features[activeFeature].icon}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
};
