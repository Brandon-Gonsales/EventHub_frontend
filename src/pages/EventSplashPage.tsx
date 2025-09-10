import React from "react";
import { useParams, Link } from "react-router-dom"; // Se importan hooks y componentes de react-router-dom
import { EventData } from "../types";

// Se actualizan las props: ahora recibe la lista de todos los eventos
interface EventSplashPageProps {
  events: EventData[];
}

const EventSplashPage: React.FC<EventSplashPageProps> = ({ events }) => {
  // Se obtiene el 'eventId' de los parámetros de la URL (ej: /event/evento-1)
  const { eventId } = useParams<{ eventId: string }>();

  // Se busca el evento correspondiente en el array de eventos
  const event = events.find((e) => e.id === eventId);

  // Si no se encuentra el evento, se puede mostrar un mensaje o redirigir
  if (!event) {
    // Opción 1: Mostrar un mensaje de error
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-slate-400">Evento no encontrado.</h2>
        <Link
          to="/"
          className="text-light-accent hover:text-light-accent_h mt-4 inline-block"
        >
          Volver al inicio
        </Link>
      </div>
    );
    // Opción 2: Redirigir a la página de inicio (descomentar si se prefiere)
    // return <Navigate to="/" replace />;
  }

  return (
    <div
      className="relative min-h-[calc(100vh-5rem)] w-full bg-cover bg-center flex items-center justify-center text-light-bg"
      style={{ backgroundImage: `url(${event.heroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative text-center p-4 z-10 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-lg">
          {event.title}
        </h1>
        <p className="mt-2 text-xl md:text-2xl font-light text-light-accent drop-shadow-md">
          {event.subtitle}
        </p>
        {/* El botón ahora es un Link que navega a la página de compra */}
        <Link
          to={`/event/${event.id}/purchase`}
          className="mt-12 inline-block bg-light-accent text-light-bg font-bold py-4 px-10 rounded-lg text-xl hover:bg-light-accent_h transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Adquirir Entradas
        </Link>
      </div>
    </div>
  );
};

export default EventSplashPage;
