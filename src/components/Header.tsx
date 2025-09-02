import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importa el componente Link

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm shadow-md h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="flex items-center justify-between">
          
          {/* 2. Envuelve el logo/nombre en un Link que apunta a la raíz "/" */}
          <Link to="/" className="text-2xl font-bold text-white tracking-tighter" aria-label="EventHub - Volver a la página de inicio">
            Event<span className="text-sky-500">Hub</span>
          </Link>

          {/* Si tuvieras otros enlaces de navegación, podrían ir aquí */}
          {/* <nav>
            <Link to="/about" className="text-slate-300 hover:text-white">Sobre nosotros</Link>
          </nav> */}

        </div>
      </div>
    </header>
  );
};

export default Header;