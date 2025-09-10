import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventSplashPage from "./pages/EventSplashPage";
import EventPurchasePage from "./pages/EventPurchasePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { allEvents } from "./data/eventData";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-light-primary text-white font-sans flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
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
