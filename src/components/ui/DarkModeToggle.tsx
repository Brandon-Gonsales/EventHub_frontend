import MoonIcon from "../icons/MoonIcon";
import Sunicon from "../icons/Sunicon";

export const DarkModeToggle: React.FC<{
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}> = ({ isDark, onToggle, className = "" }) => (
  <button
    onClick={onToggle}
    className={`relative p-2 rounded-xl  transition-all duration-300 ${className}`}
    aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
  >
    <div className="relative w-6 h-6 flex items-center justify-center">
      <Sunicon
        className={`absolute w-5 h-5 text-light-black  transform transition-all duration-500 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <MoonIcon
        className={`absolute w-5 h-5 text-light-black dark:text-dark-black transform transition-all duration-500 ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </div>
  </button>
);
