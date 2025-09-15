import React from "react";
import { Link } from "react-router-dom";
import Sunicon from "./icons/Sunicon";
import MoonIcon from "./icons/MoonIcon";

const Header: React.FC<{ theme: string; toggleTheme: () => void }> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <header className="bg-light-primary_h dark:bg-dark-primary_h backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-light-black/20 dark:border-dark-black/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
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
          <span className="text-light-black dark:text-dark-black hidden md:block">
            Tu Centro de Eventos
          </span>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-light-secondary dark:text-dark-secondary hover:text-light-secondary_h dark:hover:text-dark-secondary_h transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-light-secondary dark:focus:ring-dark-secondary"
            aria-label={`Cambiar a modo ${
              theme === "light" ? "oscuro" : "claro"
            }`}
          >
            {theme === "light" ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <Sunicon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
