import React from 'react';
import { Link } from 'react-router-dom'; 

const Header: React.FC = () => {
  return (
    <header className="bg-slate-950/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-black/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          

          <Link to="/" className="text-2xl font-bold text-white tracking-tighter" aria-label="EventHub - Volver a la página de inicio">
            Event<span className="text-sky-500">Hub</span>
          </Link>
            <span className="text-slate-200 hidden md:block">Tu Centro de Eventos</span>

        </div>
      </div>
    </header>
  );
};

export default Header;