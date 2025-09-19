import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventSplashPage from "./pages/EventSplashPage";
import EventPurchasePage from "./pages/EventPurchasePage";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import { allEvents } from "./data/eventData";

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };
  const [theme, setTheme] = useState(getInitialTheme());

  // Solo un useEffect para aplicar cambios
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary dark:text-white font-sans flex flex-col">
      <Header
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        isDark={theme === "dark"}
        onDarkModeToggle={toggleTheme}
      />
      <main className=" flex-grow">
        <Routes>
          <Route path="/" element={<HomePage events={allEvents} />} />
          <Route
            path="/event/:eventId"
            element={<EventSplashPage events={allEvents} />}
          />
          <Route
            path="/event/:eventId/purchase"
            element={<EventPurchasePage events={allEvents} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
