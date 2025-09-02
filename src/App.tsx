import React, { useState, useEffect } from 'react';
import { currentEvent } from './data/eventData';
import EventHeader from './components/EventHeader';
import EventDetails from './components/EventDetails';
import TicketPurchase from './components/TicketPurchase';
import Footer from './components/Footer';

const App: React.FC = () => {
  const event = currentEvent;
  const [location, setLocation] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setLocation(window.location.hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isFormPage = location === '#/purchase';

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <EventHeader 
        title={event.title}
        subtitle={event.subtitle}
        heroImage={event.heroImage}
      />
      
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 md:space-y-12 -mt-24 relative z-10">
        {!isFormPage && (
          <>
            <EventDetails event={event} />
            <div className="text-center py-6">
              <a
                  href="#/purchase"
                  className="bg-indigo-600 text-white font-bold text-xl py-4 px-10 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 shadow-lg"
                  aria-label="Ir al formulario de compra de entradas"
              >
                  ¡Adquiere tu Entrada Ahora!
              </a>
            </div>
          </>
        )}
        
        {isFormPage && (
          <TicketPurchase eventData={event} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;