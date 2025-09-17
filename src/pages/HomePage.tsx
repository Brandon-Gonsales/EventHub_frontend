import React from "react";
import { Link } from "react-router-dom"; // Se importa Link para la navegación
import { EventData } from "../types";
import LocationIcon from "../components/icons/LocationIcon";
import CalendarIcon from "../components/icons/CalendarIcon";

// Se eliminó 'onSelectEvent' de las props
interface HomePageProps {
  events: EventData[];
}

// Se eliminó la prop 'onSelect' y se envolvió en un componente Link
const EventCard: React.FC<{ event: EventData }> = ({ event }) => (
  <Link to={`/event/${event.id}`} className="flex">
    <div className="rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform flex flex-col cursor-pointer group w-full">
      <div className="relative overflow-hidden">
        <img
          src={event.heroImage}
          alt={`Imagen de ${event.title}`}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className={`absolute top-3 right-3 text-xs font-semibold py-1 px-3 rounded-full bg-light-tertiary text-light-primary`}
        >
          {event.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow bg-light-secondary dark:bg-dark-primary_h">
        <h3 className="text-xl font-bold text-light-primary dark:text-dark-black mb-2 leading-tight">
          {event.title}
        </h3>
        <div className="space-y-2 text-light-primary_h dark:text-dark-black text-sm mt-auto pt-4">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-light-primary_h dark:text-dark-black" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <LocationIcon className="w-4 h-4 mr-2 text-light-primary_h dark:text-dark-black" />
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
    className="relative md:rounded-b-2xl md:rounded-t-none md:h-[500px] h-[300px] w-full bg-cover bg-center flex flex-col justify-end text-light-bg md:p-12 overflow-hidden"
    style={{ backgroundImage: `url(${event.heroImage})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="relative z-10 animate-fade-in p-4">
      <span
        className={`text-sm text-light-white dark:text-dark-black font-semibold py-1 px-3 rounded-full mb-3 inline-block`}
      >
        {event.category}
      </span>
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-lg text-light-white dark:text-dark-black">
        {event.title}
      </h1>
      <p className="mt-2 text-lg md:text-xl font-light text-light-white drop-shadow-md max-w-2xl">
        {event.subtitle}
      </p>
      <Link to={`/event/${event.id}`}>
        <button className="mt-8 bg-light-secondary text-light-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-light-secondary_h transform hover:scale-105 transition-all duration-300 shadow-lg">
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
        <h2 className="text-2xl text-slate-400 dark:text-dark-black">
          No hay eventos disponibles en este momento.
        </h2>
      </div>
    );
  }

  const [heroEvent, ...otherEvents] = events;

  return (
    <div className="max-container mx-auto">
      {/* Se pasa solo el evento, sin la función onSelect */}
      <HeroSection event={heroEvent} />

      {otherEvents.length > 0 && (
        <section className="p-4 md:p-8 xl:p-0 my-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-light-black dark:text-dark-black">
            Más Eventos
          </h2>
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {otherEvents.map((event) => (
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
