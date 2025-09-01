import React from 'react';
import { EventData } from '../types';
import EventHeader from '../components/EventHeader';
import EventDetails from '../components/EventDetails';
import TicketPurchase from '../components/TicketPurchase';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

interface EventPurchasePageProps {
  event: EventData;
  onBack: () => void;
}

const EventPurchasePage: React.FC<EventPurchasePageProps> = ({ event, onBack }) => {
  return (
    <div>
      <EventHeader 
        title={event.title}
        subtitle={event.subtitle}
        heroImage={event.heroImage}
      />
      
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 md:space-y-12 -mt-24 relative z-10">
        <button 
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200"
            aria-label="Volver a todos los eventos"
        >
            <ArrowLeftIcon className="w-5 h-5"/>
            <span>Volver a todos los eventos</span>
        </button>
        <EventDetails event={event} />
        <TicketPurchase eventData={event} />
      </main>
    </div>
  );
};

export default EventPurchasePage;
