export const LoadingScreen = () => {
  return (
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
          <span className="text-purple-400">ByteSketch</span>
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
  );
};
