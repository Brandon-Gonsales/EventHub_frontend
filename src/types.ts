export type PaymentMethod = 'qr' | 'cash';

export interface EventService {
  id: string;
  name: string;
  price: number;
  // mandatory: Siempre seleccionado y deshabilitado.
  // optional: El usuario puede seleccionarlo o no.
  // exclusive: Si se selecciona, las otras opciones del mismo 'exclusiveGroup' se deseleccionan.
  type: 'mandatory' | 'optional' | 'exclusive';
  exclusiveGroup?: string;
}

export interface EventData {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  images: string[];
  date: string;
  time: string;
  location: string;
  address: string;
  description: string[];
  ticketPurchaseUrl: string;
  category: string;
  categoryColor: string;
  pricingTiers?: {
    student: number;
    professional: number;
  };
  
  services?: EventService[];
  pricingNotes?: string[];
}

// --- Tipos y datos para campos de formulario dinámicos ---

export type Department = 'sc' | 'lp' | 'cb' | 'ch' | 'or' | 'po' | 'tj' | 'be' | 'pa';

export const DEPARTMENTS: { value: Department, label: string }[] = [
    { value: 'sc', label: 'Santa Cruz' },
    { value: 'lp', label: 'La Paz' },
    { value: 'cb', label: 'Cochabamba' },
    { value: 'ch', label: 'Chuquisaca' },
    { value: 'or', label: 'Oruro' },
    { value: 'po', label: 'Potosí' },
    { value: 'tj', label: 'Tarija' },
    { value: 'be', label: 'Beni' },
    { value: 'pa', label: 'Pando' },
];

export interface University {
  id: string;
  name: string;
  type: 'pública' | 'privada';
}

const UNIVERSITIES: Record<Department, University[]> = {
    sc: [
{ id: 'uagrm', name: 'Universidad Autónoma Gabriel René Moreno', type: 'pública' },
      { id: 'uasb-sc', name: 'Universidad Andina Simón Bolívar', type: 'pública' },
      { id: 'emi-sc', name: 'Escuela Militar de Ingeniería', type: 'privada' },
      { id: 'uno', name: 'Universidad Nacional del Oriente', type: 'privada' },
      { id: 'unecologica', name: 'Universidad Nacional Ecológica', type: 'privada' },
      { id: 'ucb-sc', name: 'Universidad Católica Boliviana San Pablo', type: 'privada' },
      { id: 'ucebol', name: 'Universidad Cristiana de Bolivia', type: 'privada' },
      { id: 'umk', name: 'Universidad Empresarial Mateo Kuljis', type: 'privada' },
      { id: 'ueb', name: 'Universidad Evangélica Boliviana', type: 'privada' },
      { id: 'unifranz-sc', name: 'Universidad Privada Franz Tamayo', type: 'privada' },
      { id: 'uab-sc', name: 'Universidad de la Amazonía Boliviana', type: 'privada' },
      { id: 'udelosandes-sc', name: 'Universidad de los Andes', type: 'privada' },
      { id: 'udi', name: 'Universidad para el Desarrollo y la Innovación', type: 'privada' },
      { id: 'unur-sc', name: 'Universidad Nur', type: 'privada' },
      { id: 'upcumbre', name: 'Universidad Privada Cumbre', type: 'privada' },
      { id: 'udabol-sc', name: 'Universidad Privada de Aquino Bolivia', type: 'privada' },
      { id: 'unibeth', name: 'Universidad Bethesda', type: 'privada' },
      { id: 'upsa', name: 'Universidad Privada de Santa Cruz de la Sierra', type: 'privada' },
      { id: 'upds-sc', name: 'Universidad Privada Domingo Savio', type: 'privada' },
      { id: 'usalesiana-sc', name: 'Universidad Salesiana de Bolivia', type: 'privada' },
      { id: 'utepsa', name: 'Universidad Tecnológica Privada de Santa Cruz', type: 'privada' },
      { id: 'unicen-sc', name: 'Universidad Central', type: 'privada' },
      { id: 'upb-sc', name: 'Universidad Privada Boliviana', type: 'privada' },
      { id: 'unitepc-sc', name: 'Universidad Técnica Privada Cosmos', type: 'privada' },
      { id: 'uapiaguaiki', name: 'Universidad Indígena Guaraní Apiaguaiki Tupa', type: 'privada' },
      { id: 'uped-sc', name: 'Universidad Pedagógica', type: 'privada' }
    ],
    lp: [
{ id: 'umsa', name: 'Universidad Mayor de San Andrés', type: 'pública' },
      { id: 'upea', name: 'Universidad Pública de El Alto', type: 'pública' },
      { id: 'uabjb-lp', name: 'Universidad Autónoma del Beni José Ballivián', type: 'pública' },
      { id: 'uasb-lp', name: 'Universidad Andina Simón Bolívar', type: 'pública' },
      { id: 'unsxx', name: 'Universidad Nacional Siglo XX', type: 'pública' },
      { id: 'emi-lp', name: 'Escuela Militar de Ingeniería', type: 'privada' },
      { id: 'ucb-lp', name: 'Universidad Católica Boliviana San Pablo', type: 'privada' },
      { id: 'unicen-lp', name: 'Universidad Central', type: 'privada' },
      { id: 'udabol-lp', name: 'Universidad de Aquino Bolivia', type: 'privada' },
      { id: 'upb-lp', name: 'Universidad Privada Boliviana', type: 'privada' },
      { id: 'univalle-lp', name: 'Universidad Privada del Valle', type: 'privada' },
      { id: 'unifranz-lp', name: 'Universidad Privada Franz Tamayo', type: 'privada' },
      { id: 'uls', name: 'Universidad La Salle', type: 'privada' },
      { id: 'ubi-lp', name: 'Universidad Boliviana de Informática', type: 'privada' },
      { id: 'umbbr', name: 'Universidad Militar Mariscal Bernardino Bilbao Rioja', type: 'privada' },
      { id: 'unur', name: 'Universidad Nur', type: 'privada' },
      { id: 'uloyola', name: 'Universidad Loyola', type: 'privada' },
      { id: 'unslp', name: 'Universidad Nuestra Señora de La Paz', type: 'privada' },
      { id: 'usfa', name: 'Universidad Privada San Francisco de Asis', type: 'privada' },
      { id: 'ureal', name: 'Universidad Real', type: 'privada' },
      { id: 'usalesiana', name: 'Universidad Salesiana de Bolivia', type: 'privada' },
      { id: 'udelosandes', name: 'Universidad de los Andes', type: 'privada' },
      { id: 'upieb', name: 'Universidad para la Investigación Estratégica en Bolivia', type: 'privada' },
      { id: 'utb', name: 'Universidad Tecnológica Boliviana', type: 'privada' },
      { id: 'ub', name: 'Universidad Unión Bolivariana', type: 'privada' },
      { id: 'usp', name: 'Universidad Saint Paul', type: 'privada' },
      { id: 'ucordillera', name: 'Universidad de la Cordillera', type: 'privada' },
      { id: 'upds-lp', name: 'Universidad Privada Domingo Savio', type: 'privada' },
      { id: 'unitepc-lp', name: 'Universidad Técnica Privada Cosmos', type: 'privada' },
      { id: 'uitk', name: 'Universidad Indígena Aymara Túpac Katari', type: 'privada' },
      { id: 'uit', name: 'Universidad Indígena Tawantinsuyu', type: 'privada' },
      { id: 'uped-lp', name: 'Universidad Pedagógica', type: 'privada' }
    ],
    cb: [
      { id: 'umss', name: 'Universidad Mayor de San Simón', type: 'pública' },
      { id: 'emi-cb', name: 'Escuela Militar de Ingeniería', type: 'privada' },
      { id: 'usip', name: 'Universidad Simón I. Patiño', type: 'privada' },
      { id: 'unicen', name: 'Universidad Central', type: 'privada' },
      { id: 'ucb-cb', name: 'Universidad Católica Boliviana San Pablo', type: 'privada' },
      { id: 'ucatec', name: 'Universidad Privada de Ciencias Administrativas y Tecnológicas', type: 'privada' },
      { id: 'upds-cb', name: 'Universidad Privada Domingo Savio', type: 'privada' },
      { id: 'uped-cb', name: 'Universidad Pedagógica', type: 'privada' },
      { id: 'udabol-cb', name: 'Universidad de Aquino Bolivia', type: 'privada' },
      { id: 'uab-cb', name: 'Universidad Adventista de Bolivia', type: 'privada' },
      { id: 'upal', name: 'Universidad Privada Abierta Latinoamericana', type: 'privada' },
      { id: 'upb-cb', name: 'Universidad Privada Boliviana', type: 'privada' },
      { id: 'univalle-cb', name: 'Universidad Privada del Valle', type: 'privada' },
      { id: 'unifranz-cb', name: 'Universidad Privada Franz Tamayo', type: 'privada' },
      { id: 'unitepc-cb', name: 'Universidad Técnica Privada Cosmos', type: 'privada' },
      { id: 'ulatina', name: 'Universidad Latinoamericana', type: 'privada' },
      { id: 'uiqck', name: 'Universidad Indígena Quechua Casimiro Huanca', type: 'privada' }
    ],
    ch: [
      { id: 'usfx', name: 'Universidad Mayor Real y Pontificia San Francisco Xavier de Chuquisaca', type: 'pública' },
      { id: 'uasb-ch', name: 'Universidad Andina Simón Bolívar', type: 'pública' },
      { id: 'univalle-ch', name: 'Universidad Privada del Valle', type: 'privada' },
      { id: 'ubi-ch', name: 'Universidad Bolivia de Informática', type: 'privada' },
      { id: 'upds-ch', name: 'Universidad Privada Domingo Savio', type: 'privada' },
      { id: 'uunidad', name: 'Universidad Unidad', type: 'privada' },
      { id: 'uped-ch', name: 'Universidad Pedagógica', type: 'privada' }
    ],
    or: [
      { id: 'uto', name: 'Universidad Técnica de Oruro', type: 'pública' },
      { id: 'udabol-or', name: 'Universidad de Aquino Bolivia', type: 'privada' },
      { id: 'upal-or', name: 'Universidad Privada Abierta Latinoamericana', type: 'privada' },
      { id: 'unior', name: 'Universidad Privada De Oruro', type: 'privada' },
      { id: 'upds-or', name: 'Universidad Privada Domingo Savio', type: 'privada' },
      { id: 'uped-or', name: 'Universidad Pedagógica', type: 'privada' }
    ],
    po: [
      { id: 'uatf', name: 'Universidad Autónoma Tomás Frías', type: 'pública' },
      { id: 'unsxx-pt', name: 'Universidad Nacional Siglo XX', type: 'pública' },
      { id: 'uap-pt', name: 'Universidad Amazónica de Pando', type: 'pública' },
      { id: 'usfa-pt', name: 'Universidad Privada San Francisco de Asis', type: 'privada' },
      { id: 'upds-pt', name: 'Universidad Privada Domingo Savio', type: 'privada' },
      { id: 'uped-pt', name: 'Universidad Pedagógica', type: 'privada' }
    ],
    tj: [
      { id: 'uajms', name: 'Universidad Autónoma Juan Misael Saracho', type: 'pública' },
      { id: 'ucb-tj', name: 'Universidad Católica Boliviana San Pablo', type: 'privada' },
      { id: 'uno-tj', name: 'Universidad Nacional del Oriente', type: 'privada' },
      { id: 'upds-tj', name: 'Universidad Privada Domingo Savio', type: 'privada' },
      { id: 'uped-tj', name: 'Universidad Pedagógica', type: 'privada' }
    ],
    be: [
      { id: 'uabjb', name: 'Universidad Autónoma del Beni José Ballivián', type: 'pública' },
      { id: 'univalle-bn', name: 'Universidad Privada del Valle', type: 'privada' },
      { id: 'uab', name: 'Universidad de la Amazonía Boliviana', type: 'privada' },
      { id: 'upds-bn', name: 'Universidad Privada Domingo Savio', type: 'privada' },
      { id: 'uped-bn', name: 'Universidad Pedagógica', type: 'privada' }
    ],
    pa: [
      { id: 'uap', name: 'Universidad Amazónica de Pando', type: 'pública' },
      { id: 'unitepc-pa', name: 'Universidad Técnica Privada Cosmos', type: 'privada' },
      { id: 'uped-pa', name: 'Universidad Pedagógica', type: 'privada' }
    ],
};

export const getUniversitiesByDepartment = (department: Department): University[] => {
    return UNIVERSITIES[department] || [];
};