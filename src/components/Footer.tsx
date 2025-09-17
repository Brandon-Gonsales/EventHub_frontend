import React from "react";

const Footer: React.FC = () => {
  return (
    // <footer className="bg-light-primary_h border-t border-light-fourth">
    //   <div className="max-w-7xl mx-auto py-6 md:py-12 px-4 md:px-8">
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
    //       <div className="md:col-span-1">
    //         <h2 className="text-2xl font-bold text-light-secondary tracking-tighter">
    //           Event<span className="text-light-tertiary">Hub</span>
    //         </h2>
    //         <p className="mt-2 text-sm text-light-black">
    //           Tu portal central para los eventos más emocionantes. Descubre,
    //           regístrate y vive experiencias inolvidables.
    //         </p>
    //       </div>
    //       <div className="md:col-span-2 md:text-right text-light-black">
    //         <h3 className="text-lg font-semibold ">Contacto</h3>
    //         <p className="mt-2 text-sm">DataHubAnalytics@hotmail.com</p>
    //         <p className="text-sm">+591 75-360-623</p>
    //       </div>
    //     </div>
    //     <div className="md:text-center mt-4 text-sm text-light-black">
    //       <p>
    //         &copy; {new Date().getFullYear()} DataGroup. Todos los derechos
    //         reservados.
    //       </p>
    //     </div>
    //   </div>
    // </footer>
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-purple-400 mb-4">
              EventHub
            </div>
            <p className="text-gray-400">
              La mejor plataforma para descubrir y reservar eventos increíbles.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Eventos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Explorar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Categorías
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Populares
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EventHub. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
