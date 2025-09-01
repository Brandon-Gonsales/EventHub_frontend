import React from 'react';
import { EventData } from '../types';

interface EventSplashPageProps {
  event: EventData;
  onProceed: () => void;
}

const EventSplashPage: React.FC<EventSplashPageProps> = ({ event, onProceed }) => {
  return (
    <div 
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center text-white -mt-20" // Ajuste de margen para solapar con el espacio del header
      style={{ backgroundImage: `url(${event.heroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative text-center p-4 z-10 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-lg">
          {event.title}
        </h1>
        <p className="mt-2 text-xl md:text-2xl font-light text-indigo-300 drop-shadow-md">
          {event.subtitle}
        </p>
        <button 
          onClick={onProceed}
          className="mt-12 bg-indigo-600 text-white font-bold py-4 px-10 rounded-lg text-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Adquirir Entradas
        </button>
      </div>
    </div>
  );
};

export default EventSplashPage;
