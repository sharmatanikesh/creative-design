export const Footer = () => {
  return (
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
            <span className="text-purple-400">ByteSketch</span> 
          </h1>
        </div>

        <div className="text-center md:text-right">
          <p className="text-blue-300 text-sm">
            © 2025 ByteSketch. All rights reserved.
          </p>
          <p className="text-blue-400 text-xs mt-2">
            Designed for space explorers and pixel enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};
