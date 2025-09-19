import React from "react";
import { EventData } from "../types";
import CalendarIcon from "./icons/CalendarIcon";
import LocationIcon from "./icons/LocationIcon";

interface EventDetailsProps {
  event: EventData;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="bg-light-primary dark:bg-dark-primary_h rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mx-auto max-w-full">
      {/* Grid responsivo para fecha y ubicación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start space-x-4">
          <CalendarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-light-fourth mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-lg sm:text-xl text-light-black dark:text-dark-secondary mb-2">
              Fecha y Hora
            </h3>
            <p className="text-light-black dark:text-dark-secondary font-medium text-sm sm:text-base">
              {event.date}
            </p>
            <p className="text-light-black dark:text-dark-secondary text-sm sm:text-base">
              {event.time}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <LocationIcon className="w-8 h-8 sm:w-10 sm:h-10 text-light-fourth mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-lg sm:text-xl text-light-black dark:text-dark-secondary mb-2">
              Lugar
            </h3>
            <p className="text-light-black dark:text-dark-secondary font-medium text-sm sm:text-base">
              {event.location}
            </p>
            <p className="text-light-black dark:text-dark-secondary text-sm sm:text-base">
              {event.address}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-light-black dark:text-dark-secondary mb-4 py-2 border-b-2 border-light-fourth">
          Sobre el Evento
        </h3>
        <div className="space-y-4">
          {event.description.map((paragraph, index) => (
            <p
              key={index}
              className="text-light-black dark:text-dark-black leading-relaxed text-sm sm:text-base"
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
