import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-primary border-t border-light-fourth dark:border-dark-fourth dark:bg-dark-primary text-light-black dark:text-dark-black py-6">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-8 justify-between">
          <div>
            <h2 className="text-2xl font-bold text-light-secondary dark:text-dark-secondary tracking-tighter">
              Event
              <span className="text-light-tertiary dark:text-dark-tertiary">
                Hub
              </span>
            </h2>
            <p className="">
              La mejor plataforma para descubrir, y reservar eventos increíbles.
            </p>
          </div>

          <div className="text-light-black dark:text-dark-black text-sm">
            <h4 className="font-semibold mb-2 text-light-black dark:text-dark-black">
              Eventos
            </h4>
            <ul className="">
              <li>
                <a href="#" className="">
                  Explorar
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Categorías
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Populares
                </a>
              </li>
            </ul>
          </div>

          <div className="text-light-black dark:text-dark-black text-sm">
            <h4 className="font-semibold mb-2 text-light-black dark:text-dark-black">
              Empresa
            </h4>
            <ul className="">
              <li>
                <a href="#" className="">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>

          <div className="text-light-black dark:text-dark-black text-sm">
            <h4 className="font-semibold mb-2 text-light-black dark:text-dark-black">
              Legal
            </h4>
            <ul className="">
              <li>
                <a href="#" className="">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 text-center text-light-black dark:text-dark-black">
          <p>&copy; 2025 EventHub. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
