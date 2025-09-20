import React, { useState, useMemo } from "react";
import QrCodeIcon from "./icons/QrCodeIcon";
import CashIcon from "./icons/CashIcon";
import UploadIcon from "./icons/UploadIcon";
import CheckCircleIcon from "./icons/CheckCircleIcon";

import { EventData, PaymentMethod } from "../types";

// --- Este es el nuevo formulario, más simple, para eventos de recreación ---

interface RecreationalEventFormProps {
  eventData: EventData;
}

const RecreationalEventForm: React.FC<RecreationalEventFormProps> = ({ eventData }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("qr");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Para eventos de recreación, el precio es simple y directo
  const totalAmount = (eventData.pricingTiers as any)?.general || 0;
  const qrCodeImageUrl = "/images/qr-pago.png";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleProceedToPayment = () => {
    if (isStep1Valid) {
      setCurrentStep(2);
    } else {
      alert("Por favor, completa todos los campos para continuar.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = "https://eventhub-backend-jhht.onrender.com/api/submit";
    const payload = new FormData();

    // --- Payload simplificado para el backend ---
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("eventName", eventData.title); // Incluimos el nombre del evento
    payload.append("totalAmount", totalAmount.toString());
    payload.append("paymentMethod", selectedMethod);

    if (selectedMethod === "qr" && proofFile) {
      payload.append("proof", proofFile, proofFile.name);
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        setCurrentStep(3); // Muestra la pantalla de éxito
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error del servidor");
      }
    } catch (error: any) {
      console.error("Error al enviar el registro:", error);
      alert(`Hubo un problema al enviar tu registro: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      /^\S+@\S+\.\S+$/.test(formData.email) &&
      formData.phone.trim() !== ""
    );
  }, [formData]);

  const isStep2Valid = useMemo(() => {
    return proofFile !== null;
  }, [proofFile]);

  const getButtonClass = (method: PaymentMethod) => {
    const baseClasses = "flex-1 p-4 rounded-lg text-left transition-all duration-300 flex items-center space-x-3 text-lg font-semibold";
    return selectedMethod === method
      ? `${baseClasses} bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-primary`
      : `${baseClasses} text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary border border-light-fourth dark:border-dark-fourth hover:border-light-fourth_h hover:bg-light-secondary_h`;
  };
  
  // --- La pantalla de éxito es idéntica, para mantener consistencia ---
  if (currentStep === 3) {
    return (
      <div className="bg-white dark:bg-dark-primary rounded-lg shadow-lg p-8 text-center">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-secondary mb-4">
          ¡Registro Recibido!
        </h3>
        <p className="text-gray-600 dark:text-dark-text text-lg">
          Gracias, <span className="font-semibold text-gray-900 dark:text-dark-secondary">{formData.name}</span>.
          Hemos recibido tu registro. En breve recibirás un correo de confirmación.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold text-light-black dark:text-dark-secondary pb-3 mb-4">
        Adquiere tu Entrada
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button onClick={() => { setSelectedMethod("qr"); setCurrentStep(1); }} className={getButtonClass("qr")}>
          <QrCodeIcon className="w-8 h-8 flex-shrink-0" />
          <span>Pago QR</span>
        </button>
        <button onClick={() => { setSelectedMethod("cash"); setCurrentStep(1); }} className={getButtonClass("cash")}>
          <CashIcon className="w-8 h-8 flex-shrink-0" />
          <span>Pago en Taquilla</span>
        </button>
      </div>

      {selectedMethod === "cash" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h4 className="font-semibold text-xl text-light-secondary mb-4 dark:text-dark-secondary">
            Registra tus Datos
          </h4>
          {/* --- CAMPOS SIMPLIFICADOS --- */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1">Nombre Completo</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1">Correo Electrónico</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1">Teléfono/Celular</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth" />
            </div>
          </div>
          <button type="submit" disabled={!isStep1Valid || isSubmitting} className="w-full bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-primary font-bold py-3 px-4 rounded-lg hover:bg-light-secondary_h dark:hover:bg-dark-secondary_h disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all text-lg">
            {isSubmitting ? "Enviando..." : `Pre-Registrar y Pagar en Puerta - Bs. ${totalAmount}`}
          </button>
        </form>
      )}

      {selectedMethod === "qr" && (
        <>
          {currentStep === 1 && (
            <form className="space-y-6">
              <h4 className="font-semibold text-xl text-light-secondary mb-4 dark:text-dark-secondary">
                Paso 1: Registra tus Datos
              </h4>
              {/* --- CAMPOS SIMPLIFICADOS --- */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1">Nombre Completo</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1">Correo Electrónico</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1">Teléfono/Celular</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth" />
                </div>
              </div>
              <button type="button" onClick={handleProceedToPayment} disabled={!isStep1Valid || isSubmitting} className="w-full bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-primary font-bold py-3 px-4 rounded-lg hover:bg-light-secondary_h dark:hover:bg-dark-secondary_h disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all text-lg">
                {isSubmitting ? "Procesando..." : `Continuar al Pago - Bs. ${totalAmount}`}
              </button>
            </form>
          )}

          {currentStep === 2 && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="font-semibold text-xl text-light-black dark:text-dark-secondary mb-6">Paso 2: Realiza el Pago</h4>
                <div className="bg-light-primary_h dark:bg-dark-primary_h p-6 rounded-lg border-2 border-dashed border-light-fourth dark:border-dark-fourth">
                  <img src={qrCodeImageUrl} alt="QR Code para pago" className="mx-auto rounded-lg shadow-md mb-4" />
                  <p className="text-lg font-semibold text-light-black dark:text-dark-secondary">Monto: Bs. {totalAmount}</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <h4 className="font-semibold text-xl text-light-black dark:text-dark-secondary mb-4">Sube tu Comprobante</h4>
                <div>
                  <label htmlFor="proof" className="block w-full border-2 border-dashed border-light-fourth dark:border-dark-fourth rounded-lg p-6 text-center cursor-pointer hover:border-light-fourth_h hover:bg-light-secondary_h transition-colors">
                    <UploadIcon className="w-12 h-12 text-light-secondary dark:text-dark-secondary mx-auto mb-4" />
                    <span className="text-lg text-light-secondary dark:text-dark-secondary">{proofFile ? proofFile.name : "Subir comprobante de pago"}</span>
                    <p className="text-sm text-light-secondary dark:text-dark-secondary mt-2">Formatos: JPG, PNG, PDF</p>
                  </label>
                  <input type="file" id="proof" onChange={handleFileChange} accept="image/*,.pdf" required className="hidden" />
                </div>
                <button type="submit" disabled={!isStep2Valid || isSubmitting} className="w-full bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-secondary font-bold py-3 px-4 rounded-lg hover:bg-light-secondary_h dark:hover:bg-dark-secondary_h disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all text-lg">
                  {isSubmitting ? "Finalizando..." : "Finalizar Registro"}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecreationalEventForm;