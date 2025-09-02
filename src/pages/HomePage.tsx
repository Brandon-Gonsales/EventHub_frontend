import React from 'react';
import { Link } from 'react-router-dom'; // Se importa Link para la navegación
import { EventData } from '../types';
import LocationIcon from '../components/icons/LocationIcon';
import CalendarIcon from '../components/icons/CalendarIcon';

// Se eliminó 'onSelectEvent' de las props
interface HomePageProps {
  events: EventData[];
}

// Se eliminó la prop 'onSelect' y se envolvió en un componente Link
const EventCard: React.FC<{ event: EventData }> = ({ event }) => (
  <Link to={`/event/${event.id}`} className="flex">
    <div 
      className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer group w-full"
    >
      <div className="relative overflow-hidden">
        <img src={event.heroImage} alt={`Imagen de ${event.title}`} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className={`absolute top-3 right-3 text-xs text-white font-semibold py-1 px-3 rounded-full ${event.categoryColor}`}>
          {event.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{event.title}</h3>
        <div className="space-y-2 text-slate-400 text-sm mt-auto pt-4">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-slate-500" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <LocationIcon className="w-4 h-4 mr-2 text-slate-500" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// Se eliminó la prop 'onSelect' y el botón se envolvió en un Link
const HeroSection: React.FC<{ event: EventData }> = ({ event }) => (
  <div 
    className="relative rounded-2xl h-[500px] w-full bg-cover bg-center flex flex-col justify-end text-white p-8 md:p-12 overflow-hidden"
    style={{ backgroundImage: `url(${event.heroImage})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="relative z-10 animate-fade-in">
      <span className={`text-sm text-white font-semibold py-1 px-3 rounded-full ${event.categoryColor} mb-3 inline-block`}>
        {event.category}
      </span>
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-lg">
        {event.title}
      </h1>
      <p className="mt-2 text-lg md:text-xl font-light text-sky-300 drop-shadow-md max-w-2xl">
        {event.subtitle}
      </p>
      <Link to={`/event/${event.id}`}>
        <button 
          className="mt-8 bg-sky-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-sky-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Ver Evento
        </button>
      </Link>
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-slate-400">No hay eventos disponibles en este momento.</h2>
      </div>
    );
  }

  const [heroEvent, ...otherEvents] = events;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-16">
      {/* Se pasa solo el evento, sin la función onSelect */}
      <HeroSection event={heroEvent} />
      
      {otherEvents.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-sky-500 pl-4">
            Más Eventos
          </h2>
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherEvents.map(event => (
              // Se pasa solo el evento, sin la función onSelect
              <EventCard key={event.id} event={event} />
            ))}
          </main>
        </section>
      )}
    </div>
  );
};

export default HomePage;