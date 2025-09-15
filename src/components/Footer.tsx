import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-primary_h dark:bg-dark-primary_h border-t border-light-fourth dark:border-dark-fourth">
      <div className="max-w-7xl mx-auto py-6 md:py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-light-secondary dark:text-dark-secondary tracking-tighter">
              Event
              <span className="text-light-tertiary dark:text-dark-tertiary">
                Hub
              </span>
            </h2>
            <p className="mt-2 text-sm text-light-black dark:text-dark-black">
              Tu portal central para los eventos más emocionantes. Descubre,
              regístrate y vive experiencias inolvidables.
            </p>
          </div>
          <div className="md:col-span-2 md:text-right text-light-black dark:text-dark-black">
            <h3 className="text-lg font-semibold ">Contacto</h3>
            <p className="mt-2 text-sm">DataHubAnalytics@hotmail.com</p>
            <p className="text-sm">+591 75-360-623</p>
          </div>
        </div>
        <div className="md:text-center mt-4 text-sm text-light-black dark:text-dark-black">
          <p>
            &copy; {new Date().getFullYear()} DataGroup. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
