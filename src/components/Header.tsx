import { Link, useLocation } from "react-router-dom";
import Menu2Icon from "./icons/Menu2Icon";
import XIcon from "./icons/XIcon";
import { Button } from "./ui/Button";
import { DarkModeToggle } from "./ui/DarkModeToggle";

export const Header: React.FC<{
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  isDark: boolean;
  onDarkModeToggle: () => void;
}> = ({ onMenuToggle, isMobileMenuOpen, isDark, onDarkModeToggle }) => {
  const path = useLocation().pathname;
  const isHome = path === "/";

  return (
    <header className="bg-light-primary dark:bg-dark-primary border-b border-light-fourth dark:border-dark-fourth sticky top-0 z-50 transition-colors duration-300 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            {/* <div className="text-2xl font-bold text-light-secondary dark:text-purple-400">
            EventHub
          </div> */}
            <Link
              to="/"
              className="text-light-secondary dark:text-dark-secondary text-2xl font-bold tracking-tighter"
              aria-label="EventHub - Volver a la página de inicio"
            >
              Event
              <span className="text-light-tertiary dark:text-dark-tertiary">
                Hub
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium border-b-2 border-purple-600 dark:border-purple-400 pb-1 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                Event
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                Contact Us
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle - Desktop */}
            <DarkModeToggle
              isDark={isDark}
              onToggle={onDarkModeToggle}
              className="hidden md:flex"
            />
            {isHome && (
              <>
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Login
                </Button>
                <Button size="sm" className="hidden md:flex">
                  Register
                </Button>
              </>
            )}
            <div className="md:hidden flex items-center gap-2">
              <DarkModeToggle isDark={isDark} onToggle={onDarkModeToggle} />

              <button
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                onClick={onMenuToggle}
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <Menu2Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 transition-colors">
            <nav className="flex flex-col gap-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                Event
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                Contact Us
              </a>
              {isHome && (
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                  <Button size="sm">Register</Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
