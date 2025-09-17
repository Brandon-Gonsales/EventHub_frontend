import { Link } from "react-router-dom";
import Menu2Icon from "./icons/Menu2Icon";
import XIcon from "./icons/XIcon";
import { Button } from "./ui/Button";
import { DarkModeToggle } from "./ui/DarkModeToggle";

export const Header: React.FC<{
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  isDark: boolean;
  onDarkModeToggle: () => void;
}> = ({ onMenuToggle, isMobileMenuOpen, isDark, onDarkModeToggle }) => (
  <header className="bg-light-primary_h dark:bg-dark-primary_h border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          {/* <div className="text-2xl font-bold text-light-secondary dark:text-purple-400">
            EventHub
          </div> */}
          <Link
            to="/"
            className="text-light-secondary dark:text-dark-secondary text-2xl font-bold tracking-tighter"
            aria-label="EventHub - Volver a la página de inicio"
          >
            Event
            <span className="text-light-tertiary dark:text-dark-tertiary">
              Hub
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium border-b-2 border-purple-600 dark:border-purple-400 pb-1 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
            >
              Event
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
            >
              Contact Us
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle - Desktop */}
          <DarkModeToggle
            isDark={isDark}
            onToggle={onDarkModeToggle}
            className="hidden md:flex"
          />

          <Button variant="outline" size="sm" className="hidden md:flex">
            Login
          </Button>
          <Button size="sm" className="hidden md:flex">
            Register
          </Button>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <DarkModeToggle isDark={isDark} onToggle={onDarkModeToggle} />

            <button
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
          <nav className="flex flex-col gap-4">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
            >
              Event
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
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
// import Menu2Icon from "./icons/Menu2Icon";
// import XIcon from "./icons/XIcon";
// import { Button } from "./ui/Button";

// export const Header: React.FC<{
//   onMenuToggle: () => void;
//   isMobileMenuOpen: boolean;
// }> = ({ onMenuToggle, isMobileMenuOpen }) => (
//   <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//     <div className="container mx-auto">
//       <div className="flex items-center justify-between h-16">
//         <div className="flex items-center gap-8">
//           <div className="text-2xl font-bold text-purple-600">EventHub</div>

//           <nav className="hidden md:flex items-center gap-6">
//             <a
//               href="#"
//               className="text-gray-600 hover:text-purple-600 font-medium border-b-2 border-purple-600 pb-1"
//             >
//               Home
//             </a>
//             <a
//               href="#"
//               className="text-gray-600 hover:text-purple-600 font-medium"
//             >
//               Event
//             </a>
//             <a
//               href="#"
//               className="text-gray-600 hover:text-purple-600 font-medium"
//             >
//               About Us
//             </a>
//             <a
//               href="#"
//               className="text-gray-600 hover:text-purple-600 font-medium"
//             >
//               Contact Us
//             </a>
//           </nav>
//         </div>

//         <div className="flex items-center gap-4">
//           <Button variant="outline" size="sm" className="hidden md:flex">
//             Login
//           </Button>
//           <Button size="sm" className="hidden md:flex">
//             Register
//           </Button>

//           <button
//             className="md:hidden p-2 text-gray-600 hover:text-purple-600"
//             onClick={onMenuToggle}
//           >
//             {isMobileMenuOpen ? (
//               <XIcon className="w-6 h-6" />
//             ) : (
//               <Menu2Icon className="w-6 h-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden py-4 border-t border-gray-100">
//           <nav className="flex flex-col gap-4">
//             <a
//               href="#"
//               className="text-gray-600 hover:text-purple-600 font-medium"
//             >
//               Home
//             </a>
//             <a
//               href="#"
//               className="text-gray-600 hover:text-purple-600 font-medium"
//             >
//               Event
//             </a>
//             <a
//               href="#"
//               className="text-gray-600 hover:text-purple-600 font-medium"
//             >
//               About Us
//             </a>
//             <a
//               href="#"
//               className="text-gray-600 hover:text-purple-600 font-medium"
//             >
//               Contact Us
//             </a>
//             <div className="flex gap-2 mt-4">
//               <Button variant="outline" size="sm">
//                 Login
//               </Button>
//               <Button size="sm">Register</Button>
//             </div>
//           </nav>
//         </div>
//       )}
//     </div>
//   </header>
// );
// // import React from "react";
// // import { Link } from "react-router-dom";

// // const Header: React.FC = () => {
// //   return (
// //     <header className="bg-light-primary_h backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-black/20 shadow-lg">
// //       <div className="max-w-7xl mx-auto px-4 md:px-8">
// //         <div className="flex items-center justify-between h-20">
// //           <Link
// //             to="/"
// //             className="text-2xl font-bold text-light-secondary tracking-tighter"
// //             aria-label="EventHub - Volver a la página de inicio"
// //           >
// //             Event<span className="text-light-tertiary">Hub</span>
// //           </Link>
// //           <span className="text-light-black hidden md:block">
// //             Tu Centro de Eventos
// //           </span>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;
// import React from "react";
// import { Link } from "react-router-dom";
// import Sunicon from "./icons/Sunicon";
// import MoonIcon from "./icons/MoonIcon";

// const Header: React.FC<{ theme: string; toggleTheme: () => void }> = ({
//   theme,
//   toggleTheme,
// }) => {
//   return (
//     <header className="bg-light-primary_h dark:bg-dark-primary_h backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-light-black/20 dark:border-dark-black/20 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 md:px-8">
//         <div className="flex items-center justify-between h-20">
//           <Link
//             to="/"
//             className="text-light-secondary dark:text-dark-secondary text-2xl font-bold tracking-tighter"
//             aria-label="EventHub - Volver a la página de inicio"
//           >
//             Event
//             <span className="text-light-tertiary dark:text-dark-tertiary">
//               Hub
//             </span>
//           </Link>
//           <span className="text-light-black dark:text-dark-black hidden md:block">
//             Tu Centro de Eventos
//           </span>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full text-light-secondary dark:text-dark-secondary hover:text-light-secondary_h dark:hover:text-dark-secondary_h transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-light-secondary dark:focus:ring-dark-secondary"
//             aria-label={`Cambiar a modo ${
//               theme === "light" ? "oscuro" : "claro"
//             }`}
//           >
//             {theme === "light" ? (
//               <MoonIcon className="h-6 w-6" />
//             ) : (
//               <Sunicon className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
