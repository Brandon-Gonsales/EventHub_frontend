import React from 'react';

interface EventHeaderProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

const EventHeader: React.FC<EventHeaderProps> = ({ title, subtitle, heroImage }) => {
  return (
    <header 
      className="relative h-96 md:h-[500px] w-full bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 z-20">
        <a 
          href="#" 
          className="text-2xl font-black text-white uppercase tracking-wider hover:text-indigo-300 transition-colors duration-300 drop-shadow-md"
          aria-label="Volver a la página de inicio"
        >
          EventHub
        </a>
      </div>

      <div className="relative text-center p-4">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-lg">
          {title}
        </h1>
        <p className="mt-2 text-xl md:text-2xl font-light text-indigo-300 drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </header>
  );
};

export default EventHeader;