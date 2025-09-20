import { EventData } from '../types';

export const allEvents: EventData[] = [
  {
    id: 'congreso002',
    title: 'Congreso Académico Nacional',
    subtitle: 'Santa Cruz Paraíso del Oriente',
    heroImage: 'https://unifranz.edu.bo/wp-content/uploads/2023/02/SANTA-CRUZ.jpg',
    images: ['/images/sc01.jpg','/images/sc02.jpg','/images/sc03.jpg','/images/sc04.jpg','/images/sc05.jpg','/images/sc06.jpg','/images/sc07.jpg','/images/sc08.jpg','/images/sc09.jpg',
             '/images/sc10.jpg','/images/sc11.jpg','/images/sc12.jpg','/images/sc13.jpg','/images/sc14.jpg','/images/sc15.jpg','/images/sc16.jpg','/images/sc17.jpg','/images/sc18.jpg'],
    category: 'Congreso',
    categoryColor: 'bg-sky-500',
    date: '18-19-20 SEP, 2025',
    time: '',
    location: 'Santa Cruz de la Sierra',
    address: 'U.A.G.R.M.',
    description: [      
    "El Congreso Académico Nacional de Universidades es el encuentro más destacado del año para la comunidad educativa...",
    "✨ ¿Qué vivirás?",
    "🎉 Fiesta de Bienvenida con Sabor Cruceño...",
    "🧠 Conferencias que Inspiran...",
    "🌆 Guía Turística VIP...",
    "🔥 Y Mucho Más..."
    ],
    ticketPurchaseUrl: 'https://www.example.com/tickets/congreso-universitario-2025',
    pricingTiers: {
      student: 250,
      professional: 300,
    },
    services: [
      { id: 'inscription', name: 'Inscripción General', price: 0, type: 'mandatory' },
      { id: 'lodging', name: 'Hospedaje', price: 360, type: 'optional' },
      { id: 'groundTransport', name: 'Transporte Terrestre', price: 400, type: 'exclusive', exclusiveGroup: 'transport' },
      { id: 'airTransport', name: 'Transporte Aéreo', price: 1400, type: 'exclusive', exclusiveGroup: 'transport' }
    ],
    pricingNotes: ["El correo de confirmación puede demorar entre 1 y 24 horas"]
  },
  {
    id: 'techsummit001',
    title: 'Tech Innovate Summit 2025',
    subtitle: 'El Futuro es Ahora',
    heroImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    category: 'Tecnología',
    categoryColor: 'bg-sky-500',
    date: '10-12 NOV, 2025',
    time: '09:00 HRS',
    location: 'Cochabamba, Bolivia',
    address: 'Centro de Convenciones El Portal',
    description: [
      "Únete a los líderes de la industria tecnológica en el Tech Innovate Summit. Tres días de keynotes, talleres y networking para explorar las últimas tendencias en IA, blockchain y desarrollo de software."
    ],
    ticketPurchaseUrl: 'https://www.example.com/tickets/tech-innovate-2025',
   

      pricingTiers: {
      student: 300,
      professional: 300,
    },
    
    services: [
      { id: 'inscription-tech', name: 'Acceso General', price: 0, type: 'mandatory' },
      { id: 'workshop-ai', name: 'Taller de IA Avanzada', price: 150, type: 'optional' },
      { id: 'workshop-web3', name: 'Taller de Web3 y Blockchain', price: 150, type: 'optional' }
    ],
    pricingNotes: ["El acceso incluye almuerzo y material digital."]
  },
  // --- NUEVO EVENTO DE RECREACIÓN ---
  {
    id: 'gargola001',
    title: 'Gárgola',
    subtitle: 'Reggaeton Vieja Escuela',
    heroImage: '/images/gargola.jpg',
    images: ['/images/gargola.jpg'],
    category: 'Fiesta',
    categoryColor: 'bg-yellow-500',
    date: '21 NOV, 2025',
    time: '22:00 HRS',
    location: 'Santa Cruz de la Sierra',
    address: 'Discoteca Dubai',
    description: [
      "¡Prepárate para una noche de perreo hasta el suelo! Revive los mejores clásicos que marcaron una época.",
      "Gárgola te trae una experiencia única con los himnos del reggaetón vieja escuela que te harán vibrar toda la noche.",
      "Con los mejores DJs de la escena y un ambiente increíble. ¡No te quedes fuera de la fiesta más dura del año!"
    ],
    ticketPurchaseUrl: 'https://www.example.com/tickets/gargola-2024',
    // Usamos la nueva estructura de precios para eventos de recreación
    pricingTiers: {
      general: 70
    },
    // No hay 'services' porque no hay opciones adicionales que tiquear.
    pricingNotes: ["Cover incluye una bebida de cortesía.", "Evento para mayores de 18 años."]
  }
];