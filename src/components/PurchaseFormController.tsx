import React from 'react';
import { EventData } from '../types';
import AcademicEventForm from './AcademicEventForm';
import RecreationalEventForm from './RecreationalEventForm';

interface PurchaseFormControllerProps {
  eventData: EventData;
}

const PurchaseFormController: React.FC<PurchaseFormControllerProps> = ({ eventData }) => {
  // --- LÓGICA DE DECISIÓN MEJORADA ---
  
  // 1. Convertimos la lista a minúsculas para una comparación segura
  const academicCategories = ['congreso', 'tecnología', 'seminario', 'taller'];

  // 2. Obtenemos la categoría del evento, la pasamos a minúsculas y quitamos espacios
  const eventCategory = eventData.category.toLowerCase().trim();

  // 3. Hacemos la comprobación
  if (academicCategories.includes(eventCategory)) {
    return <AcademicEventForm eventData={eventData} />;
  } else {
    return <RecreationalEventForm eventData={eventData} />;
  }
};

export default PurchaseFormController;