import { NavItem } from "../ui/NavItem";

interface HeaderProps {
  scrollY: number;
}

export const Header = ({ scrollY }: HeaderProps) => {
  return (
    <header
      className="w-full py-6 px-8 flex justify-between items-center z-10 relative"
      style={{
        position: "sticky",
        top: 0,
        backdropFilter: "blur(5px)",
        backgroundColor: `rgba(0, 0, 0, ${Math.min(scrollY / 500, 0.8)})`,
        transition: "background-color 0.3s ease",
        zIndex: 50,
      }}
    >
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
          <span className="text-purple-400">ByteSketch</span> 
        </h1>
      </div>

      <nav>
        <ul className="flex space-x-8">
          <NavItem text="Home" index={0} href="/" />
          <NavItem text="Features" index={1} href="#features" />
          <NavItem text="Gallery" index={2} href="#gallery" />
          <NavItem text="Contact" index={3} href="#contact" />
        </ul>
      </nav>
    </header>
  );
};
