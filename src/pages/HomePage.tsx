// import React, { useState } from "react";
// import CalendarIcon from "../components/icons/CalendarIcon";
// import LocationIcon from "../components/icons/LocationIcon";
// import UserIcon from "../components/icons/UserIcon";
// import XIcon from "../components/icons/XIcon";
// import Menu2Icon from "../components/icons/Menu2Icon";
// import SearchIcon from "../components/icons/SearchIcon";
// import FilterIcon from "../components/icons/filterIcon";

// // Tipos TypeScript
// interface Event {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
//   location: string;
//   price: number;
//   image: string;
//   category: string;
//   attendees: number;
//   rating: number;
//   featured: boolean;
// }

// interface Review {
//   id: string;
//   userName: string;
//   rating: number;
//   comment: string;
//   date: string;
//   avatar: string;
// }

// // Datos de prueba
// const mockEvents: Event[] = [
//   {
//     id: "1",
//     title: "Festival de Música Electrónica 2025",
//     date: "2025-10-15",
//     time: "20:00",
//     location: "Estadio Nacional, Buenos Aires",
//     price: 15000,
//     image:
//       "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
//     category: "Música",
//     attendees: 5000,
//     rating: 4.8,
//     featured: true,
//   },
//   {
//     id: "2",
//     title: "Conferencia Tech Innovation",
//     date: "2025-11-20",
//     time: "09:00",
//     location: "Centro de Convenciones, Córdoba",
//     price: 8500,
//     image:
//       "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
//     category: "Tecnología",
//     attendees: 800,
//     rating: 4.9,
//     featured: true,
//   },
//   {
//     id: "3",
//     title: "Expo Arte Contemporáneo",
//     date: "2025-09-30",
//     time: "14:00",
//     location: "Museo de Arte Moderno, CABA",
//     price: 3500,
//     image:
//       "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
//     category: "Arte",
//     attendees: 300,
//     rating: 4.6,
//     featured: false,
//   },
//   {
//     id: "4",
//     title: "Campeonato de Gaming ESports",
//     date: "2025-12-05",
//     time: "16:00",
//     location: "Arena Gaming, Rosario",
//     price: 12000,
//     image:
//       "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
//     category: "Gaming",
//     attendees: 2500,
//     rating: 4.7,
//     featured: true,
//   },
// ];

// const mockReviews: Review[] = [
//   {
//     id: "1",
//     userName: "María González",
//     rating: 5,
//     comment:
//       "Increíble experiencia! La organización fue perfecta y el ambiente espectacular.",
//     date: "2025-09-10",
//     avatar:
//       "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=40&h=40&fit=crop&crop=face",
//   },
//   {
//     id: "2",
//     userName: "Carlos Rodríguez",
//     rating: 4,
//     comment: "Muy buena plataforma, fácil de usar y compra segura.",
//     date: "2025-09-08",
//     avatar:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
//   },
//   {
//     id: "3",
//     userName: "Ana Martínez",
//     rating: 5,
//     comment: "La mejor forma de encontrar eventos. Recomiendo totalmente!",
//     date: "2025-09-05",
//     avatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
//   },
// ];

// // Componentes reutilizables
// const Button: React.FC<{
//   variant?: "primary" | "secondary" | "outline";
//   size?: "sm" | "md" | "lg";
//   children: React.ReactNode;
//   onClick?: () => void;
//   className?: string;
// }> = ({
//   variant = "primary",
//   size = "md",
//   children,
//   onClick,
//   className = "",
// }) => {
//   const baseClasses =
//     "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2";

//   const variants = {
//     primary:
//       "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl",
//     secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
//     outline:
//       "border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white",
//   };

//   const sizes = {
//     sm: "px-4 py-2 text-sm",
//     md: "px-6 py-3 text-base",
//     lg: "px-8 py-4 text-lg",
//   };

//   return (
//     <button
//       className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

// const Card: React.FC<{
//   children: React.ReactNode;
//   className?: string;
//   hover?: boolean;
// }> = ({ children, className = "", hover = true }) => (
//   <div
//     className={`bg-white rounded-2xl shadow-lg ${
//       hover ? "hover:shadow-2xl transition-shadow duration-300" : ""
//     } ${className}`}
//   >
//     {children}
//   </div>
// );

// const Badge: React.FC<{
//   children: React.ReactNode;
//   variant?: "primary" | "secondary";
//   className?: string;
// }> = ({ children, variant = "primary", className = "" }) => {
//   const variants = {
//     primary: "bg-purple-100 text-purple-800",
//     secondary: "bg-gray-100 text-gray-800",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
//     >
//       {children}
//     </span>
//   );
// };

// // Componente de Estadísticas
// const StatsCard: React.FC<{ value: string; label: string }> = ({
//   value,
//   label,
// }) => (
//   <div className="text-center">
//     <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
//     <div className="text-gray-600">{label}</div>
//   </div>
// );

// // Componente de Evento
// const EventCard: React.FC<{
//   event: Event;
//   onViewDetails: (event: Event) => void;
// }> = ({ event, onViewDetails }) => {
//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("es-AR", {
//       style: "currency",
//       currency: "ARS",
//     }).format(price);
//   };

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString("es-AR", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <Card className="overflow-hidden group">
//       <div className="relative">
//         <img
//           src={event.image}
//           alt={event.title}
//           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         {event.featured && (
//           <Badge className="absolute top-4 left-4">Featured</Badge>
//         )}
//         {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
//           <div className="flex items-center gap-1">
//             <Star className="w-4 h-4 text-yellow-400 fill-current" />
//             <span className="text-sm font-semibold">{event.rating}</span>
//           </div>
//         </div> */}
//       </div>

//       <div className="p-6">
//         <Badge variant="secondary" className="mb-3">
//           {event.category}
//         </Badge>

//         <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
//           {event.title}
//         </h3>

//         <div className="space-y-2 mb-4">
//           <div className="flex items-center gap-2 text-gray-600">
//             <CalendarIcon className="w-4 h-4" />
//             <span className="text-sm">
//               {formatDate(event.date)} - {event.time}
//             </span>
//           </div>

//           <div className="flex items-center gap-2 text-gray-600">
//             <LocationIcon className="w-4 h-4" />
//             <span className="text-sm">{event.location}</span>
//           </div>

//           <div className="flex items-center gap-2 text-gray-600">
//             <UserIcon className="w-4 h-4" />
//             <span className="text-sm">{event.attendees} asistentes</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="text-2xl font-bold text-purple-600">
//             {formatPrice(event.price)}
//           </div>
//           <Button size="sm" onClick={() => onViewDetails(event)}>
//             Ver Detalles
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// };

// // Componente de Reseña
// const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
//   <Card className="p-6">
//     <div className="flex items-start gap-4">
//       <img
//         src={review.avatar}
//         alt={review.userName}
//         className="w-12 h-12 rounded-full object-cover"
//       />

//       <div className="flex-1">
//         <div className="flex items-center justify-between mb-2">
//           <h4 className="font-semibold text-gray-900">{review.userName}</h4>
//           {/* <div className="flex items-center gap-1">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//               />
//             ))}
//           </div> */}
//         </div>

//         <p className="text-gray-600 mb-2">{review.comment}</p>

//         <span className="text-sm text-gray-400">
//           {new Date(review.date).toLocaleDateString("es-AR")}
//         </span>
//       </div>
//     </div>
//   </Card>
// );

// // Componente de Header
// const Header: React.FC<{
//   onMenuToggle: () => void;
//   isMobileMenuOpen: boolean;
// }> = ({ onMenuToggle, isMobileMenuOpen }) => (
//   <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//     <div className="container mx-auto px-4">
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

// // Componente de Búsqueda y Filtros
// const SearchAndFilters: React.FC<{
//   searchTerm: string;
//   onSearchChange: (term: string) => void;
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
// }> = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
//   const categories = [
//     "Todos",
//     "Música",
//     "Tecnología",
//     "Arte",
//     "Gaming",
//     "Deportes",
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//       <div className="flex flex-col lg:flex-row gap-4">
//         <div className="flex-1 relative">
//           <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Buscar eventos..."
//             value={searchTerm}
//             onChange={(e) => onSearchChange(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <FilterIcon className="text-gray-400 w-5 h-5" />
//           <select
//             value={selectedCategory}
//             onChange={(e) => onCategoryChange(e.target.value)}
//             className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
//           >
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Componente Principal
// const EventHub: React.FC = () => {
//   const [events] = useState<Event[]>(mockEvents);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("Todos");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Filtrar eventos
//   const filteredEvents = events.filter((event) => {
//     const matchesSearch =
//       event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "Todos" || event.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const featuredEvents = events.filter((event) => event.featured);

//   const handleViewDetails = (event: Event) => {
//     alert(
//       `Ver detalles de: ${event.title}\n\nEsta funcionalidad se implementará en el backend.`
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header
//         onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         isMobileMenuOpen={isMobileMenuOpen}
//       />

//       <main className="container mx-auto px-4 py-8">
//         {/* Hero Section */}
//         <section className="text-center mb-16">
//           <div className="max-w-4xl mx-auto">
//             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Discover and Book
//               <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
//                 Exciting Events Online
//               </span>
//             </h1>

//             <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//               Explore a Wide Range of Events and Artists
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
//               <Button size="lg">Browse Event</Button>
//               <Button variant="outline" size="lg">
//                 Create Event
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
//               <StatsCard value="7K +" label="Events" />
//               <StatsCard value="1K +" label="Artists" />
//               <StatsCard value="250K +" label="Active Users" />
//             </div>
//           </div>
//         </section>

//         {/* Search and Filters */}
//         <SearchAndFilters
//           searchTerm={searchTerm}
//           onSearchChange={setSearchTerm}
//           selectedCategory={selectedCategory}
//           onCategoryChange={setSelectedCategory}
//         />

//         {/* Featured Events */}
//         {featuredEvents.length > 0 && (
//           <section className="mb-16">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">
//               Eventos Destacados
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {featuredEvents.map((event) => (
//                 <EventCard
//                   key={event.id}
//                   event={event}
//                   onViewDetails={handleViewDetails}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* All Events */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">
//             {filteredEvents.length > 0 ? "Popular Events" : "No Events Found"}
//           </h2>

//           {filteredEvents.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredEvents.map((event) => (
//                 <EventCard
//                   key={event.id}
//                   event={event}
//                   onViewDetails={handleViewDetails}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <div className="text-gray-400 mb-4">
//                 <CalendarIcon className="w-16 h-16 mx-auto mb-4" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 No Events Found
//               </h3>
//               <p className="text-gray-600">Come back later</p>
//             </div>
//           )}
//         </section>

//         {/* Reviews Section */}
//         <section className="mb-16">
//           <div className="flex items-center gap-3 mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">Reviews</h2>
//             <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
//               <span className="text-white text-sm font-bold">🏆</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {mockReviews.map((review) => (
//               <ReviewCard key={review.id} review={review} />
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="text-2xl font-bold text-purple-400 mb-4">
//                 EventHub
//               </div>
//               <p className="text-gray-400">
//                 La mejor plataforma para descubrir y reservar eventos
//                 increíbles.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Eventos</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Explorar
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Categorías
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Populares
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Empresa</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Sobre Nosotros
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Contacto
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Ayuda
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Legal</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Privacidad
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Términos
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Cookies
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2025 EventHub. Todos los derechos reservados.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default EventHub;
import React from "react";
import { Link } from "react-router-dom"; // Se importa Link para la navegación
import { EventData } from "../types";
import LocationIcon from "../components/icons/LocationIcon";
import CalendarIcon from "../components/icons/CalendarIcon";

// Se eliminó 'onSelectEvent' de las props
interface HomePageProps {
  events: EventData[];
}

// Se eliminó la prop 'onSelect' y se envolvió en un componente Link
const EventCard: React.FC<{ event: EventData }> = ({ event }) => (
  <Link to={`/event/${event.id}`} className="flex">
    <div className="rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform flex flex-col cursor-pointer group w-full">
      <div className="relative overflow-hidden">
        <img
          src={event.heroImage}
          alt={`Imagen de ${event.title}`}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className={`absolute top-3 right-3 text-xs text-white font-semibold py-1 px-3 rounded-full bg-light-tertiary text-light-primary`}
        >
          {event.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow bg-light-secondary">
        <h3 className="text-xl font-bold text-light-primary mb-2 leading-tight">
          {event.title}
        </h3>
        <div className="space-y-2 text-light-primary_h text-sm mt-auto pt-4">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-light-primary_h" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <LocationIcon className="w-4 h-4 mr-2 text-light-primary_h" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// Se eliminó la prop 'onSelect' y el botón se envolvió en un Link
const HeroSection: React.FC<{ event: EventData }> = ({ event }) => (
  <div
    className="relative md:rounded-b-2xl md:rounded-t-none md:h-[500px] h-[300px] w-full bg-light-bg bg-cover bg-center flex flex-col justify-end text-light-bg md:p-12 overflow-hidden"
    style={{ backgroundImage: `url(${event.heroImage})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="relative z-10 animate-fade-in p-4">
      <span
        className={`text-sm text-light-white font-semibold py-1 px-3 rounded-full mb-3 inline-block`}
      >
        {event.category}
      </span>
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-lg text-light-white">
        {event.title}
      </h1>
      <p className="mt-2 text-lg md:text-xl font-light text-light-white drop-shadow-md max-w-2xl">
        {event.subtitle}
      </p>
      <Link to={`/event/${event.id}`}>
        <button className="mt-8 bg-light-secondary text-light-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-light-secondary_h transform hover:scale-105 transition-all duration-300 shadow-lg">
          Ver Evento
        </button>
      </Link>
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-slate-400">
          No hay eventos disponibles en este momento.
        </h2>
      </div>
    );
  }

  const [heroEvent, ...otherEvents] = events;

  return (
    <div className="">
      {/* Se pasa solo el evento, sin la función onSelect */}
      <HeroSection event={heroEvent} />

      {otherEvents.length > 0 && (
        <section className="p-4 md:p-8 xl:p-0 my-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-light-black">
            Más Eventos
          </h2>
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {otherEvents.map((event) => (
              // Se pasa solo el evento, sin la función onSelect
              <EventCard key={event.id} event={event} />
            ))}
          </main>
        </section>
      )}
    </div>
  );
};

export default HomePage;
