import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 text-center text-slate-400 relative z-20">
      <p>&copy; {new Date().getFullYear()} Eventos Inc. Todos los derechos reservados.</p>
      <p className="text-sm text-slate-500 mt-1">Creado con pasión para eventos inolvidables.</p>
    </footer>
  );
};

export default Footer;