import React, { useState, useMemo, useEffect } from 'react';
import QrCodeIcon from './icons/QrCodeIcon';
import CashIcon from './icons/CashIcon';
import UploadIcon from './icons/UploadIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

import {
  EventData,
  DEPARTMENTS,
  getUniversitiesByDepartment,
  Department,
  University,
  PaymentMethod,
  EventService,
} from '../types';

// --- ADVERTENCIA DE SEGURIDAD ---
// Las credenciales están aquí directamente porque tu entorno no tiene un paso de compilación
// para leer archivos .env. Esto NO es seguro para producción, ya que expone tu token.
const TELEGRAM_BOT_TOKEN = "8418581740:AAGRvp8eJ7Zjax_CKUiDI-5vWDxBwNRV_fg";
const TELEGRAM_CHAT_ID = "1796672690";


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
  });

  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>(
    initializeServices(eventData.services)
  );
  
  const [totalAmount, setTotalAmount] = useState(0);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableUniversities, setAvailableUniversities] = useState<University[]>([]);
  
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(eventData.ticketPurchaseUrl)}&qzone=1&color=dadae8&bgcolor=1e293b`;

  useEffect(() => {
    const universities = getUniversitiesByDepartment(formData.department);
    setAvailableUniversities(universities);
    setFormData(prev => ({ ...prev, institution: '' }));
  }, [formData.department]);

  useEffect(() => {
    const amount = eventData.services?.reduce((total, service) => {
      if (selectedServices[service.id]) {
        return total + service.price;
      }
      return total;
    }, 0) || 0;
    setTotalAmount(amount);
  }, [selectedServices, eventData.services]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Error: Las credenciales de Telegram no están configuradas.");
      alert("Error de configuración: No se pudo conectar con el servicio de notificaciones.");
      setIsSubmitting(false);
      return;
    }
    
    // 1. Crear el objeto JSON plano con los datos del formulario
    const selectedServiceNames = eventData.services
        ?.filter(service => selectedServices[service.id])
        .map(service => service.name) || [];

    const submissionData = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        academicDegree: formData.academicDegree,
        department: formData.department,
        institution: formData.institution,
        career: formData.career,
        selectedServices: selectedServiceNames,
        totalAmount: totalAmount,
        paymentMethod: selectedMethod,
    };

    const jsonDataString = JSON.stringify(submissionData, null, 2);

    try {
        let response;
        // 2. Si hay un archivo (Pago QR), enviar como foto con el JSON en el pie de foto
        if (selectedMethod === 'qr' && proofFile) {
            const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
            const payload = new FormData();
            payload.append('chat_id', TELEGRAM_CHAT_ID);
            payload.append('photo', proofFile, proofFile.name);
            payload.append('caption', jsonDataString);

            response = await fetch(telegramApiUrl, {
                method: 'POST',
                body: payload, // El navegador establece el Content-Type automáticamente
            });
        } else {
            // 3. Si no hay archivo (Pago en Taquilla), enviar solo el texto JSON
            const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            response = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: jsonDataString,
                }),
            });
        }
        
        const data = await response.json();

        if (data.ok) {
            console.log("¡Datos enviados a Telegram con éxito!");
            setIsSubmitted(true);
        } else {
            throw new Error(data.description);
        }
    } catch (error) {
        console.error("Error al enviar los datos a Telegram:", error);
        alert("Hubo un problema al enviar tu registro. Por favor, inténtalo de nuevo.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const isFormValid = useMemo(() => {
    const requiredFields = [
      formData.name.trim(),
      formData.lastName.trim(),
      formData.email.trim(),
      formData.phone.trim(),
      formData.institution.trim(),
      formData.career.trim(),
      /^\S+@\S+\.\S+$/.test(formData.email),
    ];
    if (selectedMethod === 'qr') {
      return requiredFields.every(Boolean) && proofFile !== null;
    }
    return requiredFields.every(Boolean);
  }, [formData, proofFile, selectedMethod]);

  const getButtonClass = (method: PaymentMethod) => {
    const baseClasses = "flex-1 p-4 rounded-lg text-left transition-all duration-300 flex items-center space-x-3 text-lg font-semibold disabled:opacity-50";
    return selectedMethod === method
      ? `${baseClasses} bg-indigo-600 text-white shadow-lg scale-105`
      : `${baseClasses} bg-slate-700 text-slate-300 hover:bg-slate-600`;
  };
  
  if (isSubmitted) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 border border-slate-700 text-center flex flex-col items-center justify-center min-h-[500px]">
        <CheckCircleIcon className="w-24 h-24 text-green-400 mb-6"/>
        <h3 className="text-3xl font-bold text-white mb-3">¡Registro Recibido!</h3>
        <p className="text-slate-300 text-lg max-w-md">
          Gracias, <span className="font-semibold text-white">{formData.name}</span>. Hemos recibido tu pre-registro. En breve recibirás un correo de confirmación con los detalles.
        </p>
        <a
          href="#"
          className="mt-8 bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
        >
          Volver al Inicio
        </a>
      </div>
    );
  }

  return (
    <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 border border-slate-700">
       <a
        href="#"
        className="absolute top-6 left-6 text-slate-400 hover:text-white transition flex items-center text-sm z-20 group"
        aria-label="Volver a los detalles del evento"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        <span>Volver</span>
      </a>
      
      <h3 className="text-center text-2xl font-bold text-white border-b-2 border-indigo-500 pb-2 mb-6">
        Adquiere tu Entrada
      </h3>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button onClick={() => setSelectedMethod('qr')} className={getButtonClass('qr')}>
          <QrCodeIcon className="w-8 h-8 flex-shrink-0" />
          <span>Pago QR</span>
        </button>
        <button onClick={() => setSelectedMethod('cash')} className={getButtonClass('cash')}>
          <CashIcon className="w-8 h-8 flex-shrink-0" />
          <span>Pago en Taquilla</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          {selectedMethod === 'qr' && (
            <div className="text-center p-6 bg-slate-900 rounded-lg h-full">
              <h4 className="font-semibold text-lg mb-4 text-white">1. Realiza el Pago</h4>
              <p className="text-slate-400 mb-4 text-sm">Escanea el código QR desde tu banca móvil para realizar el pago. Luego, sube tu comprobante y completa tus datos para recibir tu ticket virtual.</p>
              <div className="flex justify-center p-4 bg-slate-800 border border-slate-700 rounded-lg">
                <img src={qrCodeImageUrl} alt="Código QR para comprar entrada" className="rounded-md" />
              </div>
              <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                <p className="text-white font-medium">Monto a pagar: Bs. {totalAmount}</p>
                {eventData.pricingNotes?.map((note, i) => (<p key={i} className="text-xs text-slate-400 mt-1">• {note}</p>))}
              </div>
            </div>
          )}
          {selectedMethod === 'cash' && (
            <div className="p-6 bg-slate-900 rounded-lg h-full flex flex-col justify-center">
              <h4 className="font-semibold text-lg mb-4 text-white">Instrucciones</h4>
              <p className="text-slate-400">Completa el formulario para asegurar tu pre-registro. El pago se realizará en efectivo el día del evento en la taquilla.</p>
              <div className="mt-4 p-3 bg-slate-800 rounded-lg"><p className="text-white font-medium">Monto a pagar: Bs. {totalAmount}</p></div>
              <div className="mt-4 text-sm text-amber-400/80">Nota: Tu pre-registro no garantiza la entrada. Se recomienda llegar temprano para completar el pago.</div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-semibold text-lg text-white">
            {selectedMethod === 'qr' ? '2. Registra tus Datos' : 'Registra tus Datos'}
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Nombre</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ej. Juan" required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-1">Apellidos</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Ej. Pérez" required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Correo Electrónico</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="tu@correo.com" required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">Teléfono/Celular</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Ej. 70012345" required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
          </div>

          <div>
            <label htmlFor="academicDegree" className="block text-sm font-medium text-slate-300 mb-1">Grado Académico</label>
            <select id="academicDegree" name="academicDegree" value={formData.academicDegree} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
              <option value="estudiante">Estudiante</option>
              <option value="profesional">Profesional</option>
            </select>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-1">Departamento</label>
            <select id="department" name="department" value={formData.department} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
              {DEPARTMENTS.map(dep => (<option key={dep.value} value={dep.value}>{dep.label}</option>))}
            </select>
          </div>

          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-slate-300 mb-1">Institución Universitaria</label>
            <select id="institution" name="institution" value={formData.institution} onChange={handleInputChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
              <option value="" disabled>Selecciona tu universidad</option>
              {availableUniversities.map(uni => (<option key={uni.id} value={uni.name}>{uni.name}</option>))}
            </select>
          </div>

          <div>
            <label htmlFor="career" className="block text-sm font-medium text-slate-300 mb-1">Carrera</label>
            <input type="text" id="career" name="career" value={formData.career} onChange={handleInputChange} placeholder="Ej. Ingeniería de Sistemas" required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Selecciona tus Servicios</label>
            <div className="space-y-3">
              {eventData.services?.map(service => (
                <label key={service.id} htmlFor={service.id} className={`flex items-center justify-between p-3 bg-slate-900 rounded-md border border-slate-700 transition ${service.type !== 'mandatory' ? 'hover:border-indigo-500 cursor-pointer' : 'opacity-70'}`}>
                  <div className="flex items-center">
                    <input type="checkbox" id={service.id} name={service.id} checked={selectedServices[service.id] || false} onChange={() => handleServiceChange(service)} disabled={service.type === 'mandatory'} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"/>
                    <span className={`ml-3 text-white ${service.type === 'mandatory' ? 'text-slate-400' : ''}`}>{service.name}</span>
                  </div>
                  <span className="font-semibold text-slate-300">Bs. {service.price}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedMethod === 'qr' && (
            <div>
              <label htmlFor="proof" className="block text-sm font-medium text-slate-300 mb-1">Comprobante de Pago</label>
              <label htmlFor="proof" className="w-full bg-slate-900 border border-dashed border-slate-700 rounded-md p-3 text-slate-400 hover:bg-slate-800 hover:border-indigo-500 cursor-pointer flex items-center justify-center transition">
                <UploadIcon className="w-6 h-6 mr-2" />
                <span>{proofFile ? proofFile.name : 'Subir archivo...'}</span>
              </label>
              <input type="file" id="proof" onChange={handleFileChange} accept="image/*,.pdf" required={selectedMethod === 'qr'} className="hidden" />
            </div>
          )}
          
          <button type="submit" disabled={!isFormValid || isSubmitting} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500">
            {isSubmitting ? 'Enviando...' : `Confirmar Asistencia - Bs. ${totalAmount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketPurchase;