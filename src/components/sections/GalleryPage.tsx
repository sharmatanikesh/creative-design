import { ScrollAnimation } from "../utils/ScrollAnimation";
import { Star } from "../space/Star";
import { useState } from "react";
import {
  Rocket,
  Layout,
  Palette,
  Sparkles,
  Globe,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  icon: LucideIcon;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Space Explorer",
    category: "Web Design",
    icon: Rocket,
    description:
      "A stunning space exploration website with interactive elements.",
  },
  {
    id: 2,
    title: "Galaxy UI Kit",
    category: "UI/UX Design",
    icon: Layout,
    description: "Modern UI components inspired by the cosmos.",
  },
  {
    id: 3,
    title: "Stellar Branding",
    category: "Brand Identity",
    icon: Palette,
    description: "Complete brand identity for a space technology company.",
  },
  {
    id: 4,
    title: "Cosmic Animation",
    category: "Motion Graphics",
    icon: Sparkles,
    description: "Animated space exploration sequence.",
  },
  {
    id: 5,
    title: "Planet Marketing",
    category: "Digital Marketing",
    icon: Globe,
    description: "Digital marketing campaign for space tourism.",
  },
  {
    id: 6,
    title: "Space Content",
    category: "Content Creation",
    icon: BookOpen,
    description: "Educational content about space exploration.",
  },
];

const categories = [
  "All",
  "Web Design",
  "UI/UX Design",
  "Brand Identity",
  "Motion Graphics",
  "Digital Marketing",
  "Content Creation",
];

export const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="gallery"
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background Stars */}
      {[...Array(50)].map((_, i) => (
        <Star key={i} index={i} parallax />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollAnimation animationClass="anim-zoom" threshold={0.2} delay={200}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-pixel text-white mb-6">
              <span className="text-purple-300">OUR</span> GALLERY
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore our portfolio of creative work and see how we bring ideas
              to life.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation
          animationClass="anim-slide-up"
          threshold={0.2}
          delay={300}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-pixel transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-blue-900 bg-opacity-30 text-blue-100 hover:bg-opacity-50"
                } pixelated border-2 ${
                  selectedCategory === category
                    ? "border-purple-500"
                    : "border-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <ScrollAnimation
              key={item.id}
              animationClass="anim-flip"
              threshold={0.2}
              delay={200 + index * 100}
            >
              <div
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-lg pixelated border-2 border-blue-500 bg-blue-900 bg-opacity-30 p-8">
                  <div className="flex flex-col items-center justify-center h-64">
                    <item.icon className="w-24 h-24 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                    <div className="mt-6 text-center">
                      <h3 className="text-xl font-pixel text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-100 text-sm">{item.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-opacity-30 bg-blue-900 backdrop-filter backdrop-blur-sm p-8 rounded-lg pixelated border-2 border-blue-500 max-w-4xl w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative flex items-center justify-center bg-blue-900 bg-opacity-30 p-8 rounded-lg">
                  <selectedItem.icon className="w-32 h-32 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-pixel text-white mb-4">
                    {selectedItem.title}
                  </h3>
                  <p className="text-purple-300 font-pixel mb-4">
                    {selectedItem.category}
                  </p>
                  <p className="text-blue-100 mb-6">
                    {selectedItem.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-pixel rounded-lg transition-colors duration-300 pixelated border-2 border-purple-700">
                      View Project
                    </button>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-6 py-2 bg-blue-900 bg-opacity-30 hover:bg-opacity-50 text-white font-pixel rounded-lg transition-colors duration-300 pixelated border-2 border-blue-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
