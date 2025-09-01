import React, { useState } from 'react';
import { allEvents } from './data/eventData';
import HomePage from './pages/HomePage';
import EventSplashPage from './pages/EventSplashPage';
import EventPurchasePage from './pages/EventPurchasePage';
import Footer from './components/Footer';
import { EventData } from './types';

type View = 'home' | 'splash' | 'purchase';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const handleSelectEvent = (eventId: string) => {
    const event = allEvents.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setView('splash');
    }
  };

  const handleProceedToPurchase = () => {
    if (selectedEvent) {
      setView('purchase');
    }
  };

  const handleGoHome = () => {
    setSelectedEvent(null);
    setView('home');
  };
  
  const renderView = () => {
    switch (view) {
      case 'splash':
        return selectedEvent && <EventSplashPage event={selectedEvent} onProceed={handleProceedToPurchase} />;
      case 'purchase':
        return selectedEvent && <EventPurchasePage event={selectedEvent} onBack={handleGoHome} />;
      case 'home':
      default:
        return <HomePage events={allEvents} onSelectEvent={handleSelectEvent} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div className="flex-grow">
        {renderView()}
      </div>
      <Footer />
    </div>
  );
};

export default App;