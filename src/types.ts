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
}

const UNIVERSITIES: Record<Department, University[]> = {
    sc: [
        { id: 'uagrm', name: 'Universidad Autónoma Gabriel René Moreno (UAGRM)' },
        { id: 'upsa', name: 'Universidad Privada de Santa Cruz de la Sierra (UPSA)' },
        { id: 'ute psa', name: 'Universidad Tecnológica Privada de Santa Cruz (UTEPSA)' },
        { id: 'unifranz-sc', name: 'Universidad Franz Tamayo (UNIFRANZ) - Santa Cruz' },
        { id: 'ucebol', name: 'Universidad Cristiana de Bolivia (UCEBOL)' },
        { id: 'other', name: 'Otra' },
    ],
    lp: [
        { id: 'umsa', name: 'Universidad Mayor de San Andrés (UMSA)' },
        { id: 'ucb-lp', name: 'Universidad Católica Boliviana (UCB) - La Paz' },
        { id: 'emi', name: 'Escuela Militar de Ingeniería (EMI)' },
        { id: 'unifranz-lp', name: 'Universidad Franz Tamayo (UNIFRANZ) - La Paz' },
        { id: 'other', name: 'Otra' },
    ],
    cb: [
        { id: 'umss', name: 'Universidad Mayor de San Simón (UMSS)' },
        { id: 'ucb-cb', name: 'Universidad Católica Boliviana (UCB) - Cochabamba' },
        { id: 'upb', name: 'Universidad Privada Boliviana (UPB)' },
        { id: 'univalle', name: 'Universidad del Valle (UNIVALLE)' },
        { id: 'other', name: 'Otra' },
    ],
    ch: [
        { id: 'usfx', name: 'Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca (USFX)' },
        { id: 'uasb', name: 'Universidad Andina Simón Bolívar (UASB)' },
        { id: 'other', name: 'Otra' },
    ],
    or: [
        { id: 'uto', name: 'Universidad Técnica de Oruro (UTO)' },
        { id: 'other', name: 'Otra' },
    ],
    po: [
        { id: 'uatf', name: 'Universidad Autónoma Tomás Frías (UATF)' },
        { id: 'other', name: 'Otra' },
    ],
    tj: [
        { id: 'uajms', name: 'Universidad Autónoma Juan Misael Saracho (UAJMS)' },
        { id: 'other', name: 'Otra' },
    ],
    be: [
        { id: 'uab', name: 'Universidad Autónoma del Beni "Mariscal José Ballivián" (UAB)' },
        { id: 'other', name: 'Otra' },
    ],
    pa: [
        { id: 'uap', name: 'Universidad Amazónica de Pando (UAP)' },
        { id: 'other', name: 'Otra' },
    ],
};

export const getUniversitiesByDepartment = (department: Department): University[] => {
    return UNIVERSITIES[department] || [];
};