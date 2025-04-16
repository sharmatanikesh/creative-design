import { ScrollAnimation } from "../utils/ScrollAnimation";
import { FeatureCard } from "../ui/FeatureCard";

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 md:px-10 relative">
      <ScrollAnimation animationClass="anim-flip" threshold={0.3} delay={200}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-pixel text-white mb-6">
            <span className="text-yellow-300">OUR</span> SERVICES
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover our comprehensive range of creative design solutions
          </p>
        </div>
      </ScrollAnimation>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="Web Design"
          description="Create stunning, responsive websites that captivate your audience and drive engagement."
          icon="🌐"
          index={0}
        />
        <FeatureCard
          title="UI/UX Design"
          description="Craft intuitive user interfaces and seamless experiences that delight your users."
          icon="🎨"
          index={1}
        />
        <FeatureCard
          title="Brand Identity"
          description="Develop a unique brand identity that stands out and resonates with your target audience."
          icon="✨"
          index={2}
        />
        <FeatureCard
          title="Motion Graphics"
          description="Bring your brand to life with dynamic animations and engaging motion design."
          icon="🎬"
          index={3}
        />
        <FeatureCard
          title="Digital Marketing"
          description="Boost your online presence with strategic digital marketing solutions."
          icon="📈"
          index={4}
        />
        <FeatureCard
          title="Content Creation"
          description="Produce compelling visual content that tells your brand's story effectively."
          icon="📱"
          index={5}
        />
      </div>
    </section>
  );
};
