import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";

export const DarkModeToggle: React.FC<{
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}> = ({ isDark, onToggle, className = "" }) => (
  <button
    onClick={onToggle}
    className={`relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ${className}`}
    aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
  >
    <div className="relative w-6 h-6 flex items-center justify-center">
      <SunIcon
        className={`absolute w-5 h-5 text-yellow-500 transform transition-all duration-500 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <MoonIcon
        className={`absolute w-5 h-5 text-blue-400 transform transition-all duration-500 ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </div>
  </button>
);
