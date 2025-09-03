import React, { useState, useMemo, useEffect } from 'react';
import QrCodeIcon from './icons/QrCodeIcon';
import CashIcon from './icons/CashIcon';
import UploadIcon from './icons/UploadIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

import {
  EventData,
  DEPARTMENTS,
  getUniversitiesByDepartment,
  Department,
  University,
  PaymentMethod,
  EventService,
} from '../types';

const validResellerCodes = [
  'DAVO01',
  'DAVO02',
  'DAVO03',
  'DAVO04',
  'DAVO05',
  'DAVO06',
  'DAVO07',
  'DAVO08',
  'DAVO09',
  'DAVO10',
  'NONO01',
  'NONO02',
  'NONO03',
  'NONO04',
  'NONO05',
  'NONO06',
  'NONO07',
  'NONO08',
  'NONO09',
  'NONO10',
];

const initializeServices = (services: EventService[] = []): Record<string, boolean> => {
  return services.reduce((acc, service) => {
    acc[service.id] = service.type === 'mandatory';
    return acc;
  }, {} as Record<string, boolean>);
};

interface TicketPurchaseProps {
  eventData: EventData;
}

const TicketPurchase: React.FC<TicketPurchaseProps> = ({ eventData }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('qr');
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    academicDegree: 'estudiante',
    department: 'sc' as Department,
    phone: '',
    institution: '',
    career: '',
    resellerCode: '',
  });

  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>(
    initializeServices(eventData.services)
  );
  
  const [totalAmount, setTotalAmount] = useState(0);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [availableUniversities, setAvailableUniversities] = useState<University[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(eventData.ticketPurchaseUrl)}&qzone=1&color=dadae8&bgcolor=1e293b`;

  useEffect(() => {
    const universities = getUniversitiesByDepartment(formData.department);
    setAvailableUniversities(universities);
    setFormData(prev => ({ ...prev, institution: '' }));
  }, [formData.department]);

  useEffect(() => {
    // 1. Nos aseguramos de que el evento tenga la información de precios que añadimos en eventData.ts
    if (!eventData.pricingTiers) {
      console.error("Datos de precios no encontrados para este evento.");
      return;
    }

    // 2. Determinamos el precio base correcto mirando el valor del formulario
    const basePrice = formData.academicDegree === 'estudiante'
      ? eventData.pricingTiers.student     // Si es estudiante, el precio es 250
      : eventData.pricingTiers.professional; // Si no, es profesional, y el precio es 300

    // 3. Calculamos el costo de los servicios EXTRA (opcionales) que el usuario haya marcado
    const additionalServicesCost = eventData.services?.reduce((total, service) => {
      // Solo sumamos el precio si el servicio está seleccionado Y NO es el de inscripción obligatoria
      if (selectedServices[service.id] && service.type !== 'mandatory') {
        return total + service.price;
      }
      return total;
    }, 0) || 0;

    // 4. El total final es la suma del precio base + los servicios extra
    setTotalAmount(basePrice + additionalServicesCost);

  // 5. ¡MUY IMPORTANTE! Le decimos a React que vuelva a ejecutar este cálculo si cambia
  // la selección de servicios O si cambia el grado académico.
  }, [selectedServices, eventData.services, eventData.pricingTiers, formData.academicDegree]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceChange = (clickedService: EventService) => {
    if (clickedService.type === 'mandatory') return;

    setSelectedServices(prev => {
      const newState = { ...prev, [clickedService.id]: !prev[clickedService.id] };
      if (clickedService.type === 'exclusive' && newState[clickedService.id]) {
        eventData.services?.forEach(service => {
          if (service.exclusiveGroup === clickedService.exclusiveGroup && service.id !== clickedService.id) {
            newState[service.id] = false;
          }
        });
      }
      return newState;
    });
  };
  const handleProceedToPayment = () => {
    if (isStep1Valid) {
      setCurrentStep(2);
    } else {
      alert("Por favor, completa todos los campos obligatorios para continuar.");
    }
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const apiUrl = 'https://eventhub-backend-jhht.onrender.com/api/submit';

  const payload = new FormData();
  payload.append('name', formData.name);
  payload.append('lastName', formData.lastName);
  payload.append('email', formData.email);
  payload.append('phone', formData.phone);
  payload.append('academicDegree', formData.academicDegree);
  payload.append('department', formData.department);
  payload.append('institution', formData.institution);
  payload.append('career', formData.career);
  payload.append('resellerCode', formData.resellerCode);
  
  const selectedServiceNames = eventData.services
      ?.filter(service => selectedServices[service.id])
      .map(service => service.name) || [];

  payload.append('selectedServices', JSON.stringify(selectedServiceNames));
  payload.append('totalAmount', totalAmount.toString());
  payload.append('paymentMethod', selectedMethod);

  if (selectedMethod === 'qr' && proofFile) {
    payload.append('proof', proofFile, proofFile.name);
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: payload,
    });

    if (response.ok) {
      console.log("¡Datos enviados con éxito!");
      setCurrentStep(3); // <-- CORRECCIÓN: Actualiza el paso a 3
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error del servidor');
    }
  } catch (error: any) {
    console.error("Error al enviar el registro:", error);
    alert(`Hubo un problema al enviar tu registro: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};

// Validador para el PASO 1 (el formulario de datos)
const isStep1Valid = useMemo(() => {
  const requiredFields = [
    formData.name.trim(),
    formData.lastName.trim(),
    formData.email.trim(),
    formData.phone.trim(),
    formData.institution.trim(),
    formData.career.trim(),
    /^\S+@\S+\.\S+$/.test(formData.email),
  ];
  return requiredFields.every(Boolean);
}, [formData]);

// Validador para el PASO 2 (la subida del comprobante)
const isStep2Valid = useMemo(() => {
  return proofFile !== null;
}, [proofFile]);

  const getButtonClass = (method: PaymentMethod) => {
    const baseClasses = "flex-1 p-4 rounded-lg text-left transition-all duration-300 flex items-center space-x-3 text-lg font-semibold disabled:opacity-50";
    return selectedMethod === method
      ? `${baseClasses} bg-sky-600 text-white shadow-lg scale-105`
      : `${baseClasses} bg-slate-700 text-slate-300 hover:bg-slate-600`;
  };
  
// --- RENDERIZADO DEL COMPONENTE ---

// Componente reutilizable que contiene todos los campos del formulario
const FormFields = () => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Nombre</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"/>
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-1">Apellidos</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"/>
      </div>
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Correo Electrónico</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"/>
    </div>
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">Teléfono/Celular</label>
      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"/>
    </div>
    <div>
      <label htmlFor="academicDegree" className="block text-sm font-medium text-slate-300 mb-1">Grado Académico</label>
      <select id="academicDegree" name="academicDegree" value={formData.academicDegree} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition">
        <option value="estudiante">Estudiante</option>
        <option value="profesional">Profesional</option>
      </select>
    </div>
    <div>
      <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-1">Departamento</label>
      <select id="department" name="department" value={formData.department} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition">
        {DEPARTMENTS.map(dep => (<option key={dep.value} value={dep.value}>{dep.label}</option>))}
      </select>
    </div>
    <div>
      <label htmlFor="institution" className="block text-sm font-medium text-slate-300 mb-1">Institución</label>
      <select id="institution" name="institution" value={formData.institution} onChange={handleInputChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition">
        <option value="" disabled>Selecciona tu universidad</option>
        {availableUniversities.map(uni => (<option key={uni.id} value={uni.name}>{uni.name}</option>))}
      </select>
    </div>
    <div>
      <label htmlFor="career" className="block text-sm font-medium text-slate-300 mb-1">Carrera</label>
      <input type="text" id="career" name="career" value={formData.career} onChange={handleInputChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"/>
    </div>
    <div>
        <label htmlFor="resellerCode" className="block text-sm font-medium text-slate-300 mb-1">Código de Revendedor (Opcional)</label>
        <select id="resellerCode" name="resellerCode" value={formData.resellerCode} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white ...">
          <option value="">Selecciona un código...</option>
          {validResellerCodes.map(code => (<option key={code} value={code}>{code}</option>))}
        </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Selecciona tus Servicios</label>
      <div className="space-y-3">
        {eventData.services?.map(service => (
          <label key={service.id} htmlFor={service.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-md border border-slate-700 transition cursor-pointer hover:border-sky-500">
            <div className="flex items-center">
              <input type="checkbox" id={service.id} name={service.id} checked={selectedServices[service.id] || false} onChange={() => handleServiceChange(service)} disabled={service.type === 'mandatory'} className="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"/>
              <span className="ml-3 text-white">{service.name}</span>
            </div>
            <span className="font-semibold text-slate-300">
              Bs. {
                service.type === 'mandatory'
                  ? (formData.academicDegree === 'estudiante' ? eventData.pricingTiers?.student : eventData.pricingTiers?.professional)
                  : service.price
              }
            </span>
          </label>
        ))}
      </div>
    </div>
  </>
);

// Renderizado del Paso 3 (Confirmación)
if (currentStep === 3) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 border border-slate-700 text-center flex flex-col items-center justify-center min-h-[500px]">
      <CheckCircleIcon className="w-24 h-24 text-green-400 mb-6"/>
      <h3 className="text-3xl font-bold text-white mb-3">¡Registro Recibido!</h3>
      <p className="text-slate-300 text-lg max-w-md">
        Gracias, <span className="font-semibold text-white">{formData.name}</span>. Hemos recibido tu registro. En breve recibirás un correo de confirmación.
      </p>
    </div>
  );
}

// Renderizado principal para Pasos 1 y 2
return (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 border border-slate-700">
    <h3 className="text-2xl font-bold text-white border-b-2 border-sky-500 pb-2 mb-6">Adquiere tu Entrada</h3>
    
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <button onClick={() => { setSelectedMethod('qr'); setCurrentStep(1); }} className={getButtonClass('qr')}><QrCodeIcon className="w-8 h-8 flex-shrink-0"/><span>Pago QR</span></button>
      <button onClick={() => { setSelectedMethod('cash'); setCurrentStep(1); }} className={getButtonClass('cash')}><CashIcon className="w-8 h-8 flex-shrink-0"/><span>Pago en Taquilla</span></button>
    </div>

    {/* --- FLUJO PARA PAGO EN TAQUILLA (UN SOLO PASO) --- */}
    {selectedMethod === 'cash' && (
      <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-semibold text-lg text-white">Paso Único: Registra tus Datos</h4>
          <FormFields />
          <button type="submit" disabled={!isStep1Valid || isSubmitting} className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all">
            {isSubmitting ? 'Enviando...' : `Pre-Registrar y Pagar en Puerta - Bs. ${totalAmount}`}
          </button>
      </form>
    )}

    {/* --- FLUJO PARA PAGO QR (VARIOS PASOS) --- */}
    {selectedMethod === 'qr' && (
      <>
        {/* PASO 1: FORMULARIO DE DATOS */}
        {currentStep === 1 && (
          <form className="space-y-4">
            <h4 className="font-semibold text-lg text-white">Paso 1: Registra tus Datos</h4>
            <FormFields />
            <button type="button" onClick={handleProceedToPayment} disabled={!isStep1Valid || isSubmitting} className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all">
              { isSubmitting ? 'Procesando...' : 'Continuar al Pago' }
            </button>
          </form>
        )}

        {/* PASO 2: PAGO Y SUBIDA DE COMPROBANTE */}
        {currentStep === 2 && (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="text-center p-6 bg-slate-900 rounded-lg h-full">
              <h4 className="font-semibold text-lg mb-4 text-white">Paso 2: Realiza el Pago y Sube tu Comprobante</h4>
              <div className="flex justify-center p-4 bg-slate-800 border border-slate-700 rounded-lg"><img src={qrCodeImageUrl} alt="QR Code" className="rounded-md"/></div>
              <div className="mt-4 p-3 bg-slate-800 rounded-lg"><p className="text-white font-medium">Monto a pagar: Bs. {totalAmount}</p></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-semibold text-lg text-white">Sube tu Comprobante (Obligatorio)</h4>
              <label htmlFor="proof" className="w-full bg-slate-900 border border-dashed border-slate-700 rounded-md p-3 text-slate-400 hover:bg-slate-800 hover:border-sky-500 cursor-pointer flex items-center justify-center transition">
                <UploadIcon className="w-6 h-6 mr-2" />
                <span>{proofFile ? proofFile.name : 'Subir archivo...'}</span>
              </label>
              <input type="file" id="proof" onChange={handleFileChange} accept="image/*,.pdf" required className="hidden" />
              <button type="submit" disabled={!isStep2Valid || isSubmitting} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all">
                {isSubmitting ? 'Finalizando...' : 'Finalizar Registro'}
              </button>
            </form>
          </div>
        )}
      </>
    )}
  </div>
);
};

export default TicketPurchase;