// import React from "react";
// import { EventData } from "../types";
// import CalendarIcon from "./icons/CalendarIcon";
// import LocationIcon from "./icons/LocationIcon";

// interface EventDetailsProps {
//   event: EventData;
// }

// const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
//   return (
//     <div className="bg-light-primary backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 border border-light-border">
//       <div className="grid md:grid-cols-2 gap-8 mb-8 text-light-bg_h">
//         <div className="flex items-start space-x-4">
//           <CalendarIcon className="w-10 h-10 text-light-accent mt-1 flex-shrink-0" />
//           <div>
//             <h3 className="font-bold text-lg text-light-bg">Fecha y Hora</h3>
//             <p>{event.date}</p>
//             <p>{event.time}</p>
//           </div>
//         </div>
//         <div className="flex items-start space-x-4">
//           <LocationIcon className="w-10 h-10 text-light-accent mt-1 flex-shrink-0" />
//           <div>
//             <h3 className="font-bold text-lg text-light-bg">Lugar</h3>
//             <p>{event.location}</p>
//             <p className="text-light-bg_h">{event.address}</p>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-4 text-light-bg_h leading-relaxed">
//         <h3 className="text-2xl font-bold text-light-bg border-b-2 border-light-accent pb-2 mb-4">
//           Sobre el Evento
//         </h3>
//         {event.description.map((paragraph, index) => (
//           <p key={index}>{paragraph}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventDetails;
import React from "react";
import { EventData } from "../types";
import CalendarIcon from "./icons/CalendarIcon";
import LocationIcon from "./icons/LocationIcon";

interface EventDetailsProps {
  event: EventData;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mx-auto max-w-full text-gray-800">
      {/* Grid responsivo para fecha y ubicación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-start space-x-4">
          <CalendarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
              Fecha y Hora
            </h3>
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              {event.date}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">{event.time}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <LocationIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
              Lugar
            </h3>
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              {event.location}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              {event.address}
            </p>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-200 mb-6"></div>

      {/* Descripción del evento */}
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          Sobre el Evento
        </h3>
        <div className="space-y-4">
          {event.description.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-700 leading-relaxed text-sm sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
