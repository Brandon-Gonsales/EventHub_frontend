import React from 'react';
import { EventData } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import LocationIcon from './icons/LocationIcon';

interface EventDetailsProps {
  event: EventData;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 border border-slate-700">
      <div className="grid md:grid-cols-2 gap-8 mb-8 text-slate-300">
        <div className="flex items-start space-x-4">
          <CalendarIcon className="w-10 h-10 text-sky-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg text-white">Fecha y Hora</h3>
            <p>{event.date}</p>
            <p>{event.time}</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <LocationIcon className="w-10 h-10 text-sky-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg text-white">Lugar</h3>
            <p>{event.location}</p>
            <p className="text-slate-400">{event.address}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 text-slate-300 leading-relaxed">
        <h3 className="text-2xl font-bold text-white border-b-2 border-sky-500 pb-2 mb-4">
          Sobre el Evento
        </h3>
        {event.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
