import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventSplashPage from "./pages/EventSplashPage";
import EventPurchasePage from "./pages/EventPurchasePage";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import { allEvents } from "./data/eventData";

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-light-primary font-sans flex flex-col">
      <Header
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <main className="container mx-auto">
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
