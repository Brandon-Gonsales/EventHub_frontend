import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-950/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-black/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-baseline space-x-2">
            <h1 className="text-3xl font-bold text-white tracking-tighter">
              Event<span className="text-sky-400">Hub</span>
            </h1>
            <span className="text-slate-200 hidden md:block">Tu Centro de Eventos</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;