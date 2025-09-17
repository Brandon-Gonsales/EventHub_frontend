import Menu2Icon from "./icons/Menu2Icon";
import XIcon from "./icons/XIcon";
import { Button } from "./ui/Button";

export const Header: React.FC<{
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}> = ({ onMenuToggle, isMobileMenuOpen }) => (
  <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
    <div className="container mx-auto">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold text-purple-600">EventHub</div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 font-medium border-b-2 border-purple-600 pb-1"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 font-medium"
            >
              Event
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 font-medium"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 font-medium"
            >
              Contact Us
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Login
          </Button>
          <Button size="sm" className="hidden md:flex">
            Register
          </Button>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-purple-600"
            onClick={onMenuToggle}
          >
            {isMobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <Menu2Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-100">
          <nav className="flex flex-col gap-4">
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 font-medium"
            >
              Event
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 font-medium"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 font-medium"
            >
              Contact Us
            </a>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button size="sm">Register</Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  </header>
);
// import React from "react";
// import { Link } from "react-router-dom";

// const Header: React.FC = () => {
//   return (
//     <header className="bg-light-primary_h backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-black/20 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 md:px-8">
//         <div className="flex items-center justify-between h-20">
//           <Link
//             to="/"
//             className="text-2xl font-bold text-light-secondary tracking-tighter"
//             aria-label="EventHub - Volver a la página de inicio"
//           >
//             Event<span className="text-light-tertiary">Hub</span>
//           </Link>
//           <span className="text-light-black hidden md:block">
//             Tu Centro de Eventos
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
