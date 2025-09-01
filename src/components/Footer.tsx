import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 text-slate-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
             <h2 className="text-2xl font-bold text-white tracking-tighter">
              Event<span className="text-sky-400">Hub</span>
            </h2>
            <p className="mt-2 text-sm">
              Tu portal central para los eventos más emocionantes. Descubre, regístrate y vive experiencias inolvidables.
            </p>
          </div>
          <div className="md:col-span-2 md:text-right">
            <h3 className="text-lg font-semibold text-white">Contacto</h3>
            <p className="mt-2 text-sm">DataHubAnalytics@hotmail.com</p>
            <p className="text-sm">+591 75-360-623</p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} DataGroup. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;