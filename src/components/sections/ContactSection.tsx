import { ScrollAnimation } from "../utils/ScrollAnimation";
import { Star } from "../space/Star";
import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
              <span className="text-purple-300">CONTACT</span> US
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Ready to start your creative journey? Send us a message and let's
              create something amazing together.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollAnimation
            animationClass="anim-slide-right"
            threshold={0.2}
            delay={400}
          >
            <div className="bg-opacity-30 bg-blue-900 backdrop-filter backdrop-blur-sm p-8 rounded-lg pixelated border-2 border-blue-500">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-blue-100 mb-2 font-pixel"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-blue-800 bg-opacity-50 border border-blue-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pixelated"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-blue-100 mb-2 font-pixel"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-blue-800 bg-opacity-50 border border-blue-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pixelated"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-blue-100 mb-2 font-pixel"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-blue-800 bg-opacity-50 border border-blue-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pixelated"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-pixel rounded-lg transition-colors duration-300 pixelated border-2 border-purple-700"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </ScrollAnimation>

          {/* Contact Info */}
          <ScrollAnimation
            animationClass="anim-slide-left"
            threshold={0.2}
            delay={600}
          >
            <div className="space-y-8">
              <div className="bg-opacity-30 bg-blue-900 backdrop-filter backdrop-blur-sm p-8 rounded-lg pixelated border-2 border-blue-500">
                <h3 className="text-2xl font-pixel text-white mb-6">
                  <span className="text-yellow-300">GET IN</span> TOUCH
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center pixelated">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-100 font-pixel">Email</p>
                      <p className="text-white">contact@pixelspace.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center pixelated">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-100 font-pixel">Phone</p>
                      <p className="text-white">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center pixelated">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-100 font-pixel">Location</p>
                      <p className="text-white">
                        123 Space Avenue, Galaxy City
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-opacity-30 bg-blue-900 backdrop-filter backdrop-blur-sm p-8 rounded-lg pixelated border-2 border-blue-500">
                <h3 className="text-2xl font-pixel text-white mb-6">
                  <span className="text-yellow-300">FOLLOW</span> US
                </h3>
                <div className="flex space-x-4">
                  {["Twitter", "Instagram", "LinkedIn", "GitHub"].map(
                    (platform) => (
                      <a
                        key={platform}
                        href="#"
                        className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center pixelated transition-colors duration-300"
                      >
                        <span className="text-white font-pixel text-sm">
                          {platform[0]}
                        </span>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};
