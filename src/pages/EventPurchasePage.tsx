// import React from "react";
// import { useParams, Link } from "react-router-dom"; // Se importan hooks y componentes de react-router-dom
// import { EventData } from "../types";
// import EventHeader from "../components/EventHeader";
// import EventDetails from "../components/EventDetails";
// import TicketPurchase from "../components/TicketPurchase";
// import ArrowLeftIcon from "../components/icons/ArrowLeftIcon";

// // Se cambian las props para recibir la lista completa de eventos
// interface EventPurchasePageProps {
//   events: EventData[];
// }

// const EventPurchasePage: React.FC<EventPurchasePageProps> = ({ events }) => {
//   // Se obtiene el 'eventId' de la URL (ej: /event/evento-1/purchase)
//   const { eventId } = useParams<{ eventId: string }>();

//   // Se busca el evento correspondiente en el array
//   const event = events.find((e) => e.id === eventId);

//   // Si el evento no se encuentra, se muestra un mensaje de error
//   if (!event) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl text-slate-400">
//           Página de compra no encontrada.
//         </h2>
//         <Link
//           to="/"
//           className="text-sky-400 hover:text-sky-300 mt-4 inline-block"
//         >
//           Volver al inicio
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <EventHeader
//         event={event}
//         title={event.title}
//         subtitle={event.subtitle}
//         images={event.images}
//       />

//       <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 md:space-y-12 md:-mt-24  relative z-10">
//         {/* El botón de 'onBack' se reemplaza por un Link a la página de inicio */}
//         <Link
//           to="/"
//           className="mb-4 inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200"
//           aria-label="Volver a todos los eventos"
//         >
//           <ArrowLeftIcon className="w-5 h-5" />
//           <span>Volver a todos los eventos</span>
//         </Link>
//         {/* <EventDetails event={event} /> */}
//         <TicketPurchase eventData={event} />
//       </main>
//     </div>
//   );
// };

// export default EventPurchasePage;
import React from "react";
import { useParams, Link } from "react-router-dom";
import { EventData } from "../types";
import EventHeader from "../components/EventHeader";
import EventDetails from "../components/EventDetails";
import TicketPurchase from "../components/TicketPurchase";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon";

interface EventPurchasePageProps {
  events: EventData[];
}

const EventPurchasePage: React.FC<EventPurchasePageProps> = ({ events }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Evento no encontrado
          </h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <EventHeader
        event={event}
        title={event.title}
        subtitle={event.subtitle}
        images={event.images}
      />

      <main className="max-w-6xl mx-auto p-4 md:p-8 xl:p-0 my-6 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-light-secondary hover:text-light-secondary_h font-medium transition-colors py-2 mb-4 dark:text-dark-secondary dark:hover:text-dark-secondary_h"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Volver a todos los eventos</span>
        </Link>

        <div className="grid gap-8 ">
          <div>
            <EventDetails event={event} />
          </div>
          <div>
            <TicketPurchase eventData={event} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventPurchasePage;
