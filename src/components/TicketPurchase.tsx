import React, { useState, useMemo, useEffect } from "react";
import QrCodeIcon from "./icons/QrCodeIcon";
import CashIcon from "./icons/CashIcon";
import UploadIcon from "./icons/UploadIcon";
import CheckCircleIcon from "./icons/CheckCircleIcon";

import {
  EventData,
  DEPARTMENTS,
  getUniversitiesByDepartment,
  Department,
  University,
  PaymentMethod,
  EventService,
} from "../types";

const validResellerCodes = [
  "DAVO01",
  "DAVO02",
  "DAVO03",
  "DAVO04",
  "DAVO05",
  "DAVO06",
  "DAVO07",
  "DAVO08",
  "DAVO09",
  "DAVO10",
  "NONO01",
  "NONO02",
  "NONO03",
  "NONO04",
  "NONO05",
  "NONO06",
  "NONO07",
  "NONO08",
  "NONO09",
  "NONO10",
  "MATE01",
  "MATE02",
  "MATE03",
  "MATE04",
  "MATE05",
  "MATE06",
  "MATE07",
  "MATE08",
  "MATE09",
  "MATE10",
  "KATE01",
  "KATE02",
  "KATE03",
  "KATE04",
  "KATE05",
  "KATE06",
  "KATE07",
  "KATE08",
  "KATE09",
  "KATE10",
  "ROGE01",
  "ROGE02",
  "ROGE03",
  "ROGE04",
  "ROGE05",
  "ROGE06",
  "ROGE07",
  "ROGE08",
  "ROGE09",
  "ROGE10",
  "FICT01",
  "FICT02",
  "FICT03",
  "FICT04",
  "FICT05",
  "BELN01",
  "TECH01",
  "TECH02",
  "TECH03",
  "TECH04",
  "TECH05",
];

const initializeServices = (
  services: EventService[] = []
): Record<string, boolean> => {
  return services.reduce((acc, service) => {
    acc[service.id] = service.type === "mandatory";
    return acc;
  }, {} as Record<string, boolean>);
};

const FormFields: React.FC<{
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleServiceChange: (service: EventService) => void;
  availableUniversities: University[];
  selectedServices: Record<string, boolean>;
  eventData: EventData;
}> = ({
  formData,
  handleInputChange,
  handleServiceChange,
  availableUniversities,
  selectedServices,
  eventData,
}) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth"
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1"
        >
          Apellidos
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1"
        >
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1"
        >
          Teléfono/Celular
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="academicDegree"
          className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1"
        >
          Grado Académico
        </label>
        <select
          id="academicDegree"
          name="academicDegree"
          value={formData.academicDegree}
          onChange={handleInputChange}
          className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth"
        >
          <option value="estudiante">Estudiante</option>
          <option value="profesional">Profesional</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="department"
          className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1"
        >
          Departamento
        </label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth"
        >
          {DEPARTMENTS.map((dep) => (
            <option key={dep.value} value={dep.value}>
              {dep.label}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div>
      <label
        htmlFor="institution"
        className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1"
      >
        Institución
      </label>
      <select
        id="institution"
        name="institution"
        value={formData.institution}
        onChange={handleInputChange}
        required
        className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth"
      >
        <option value="" disabled>
          Selecciona tu universidad
        </option>
        {availableUniversities.map((uni) => (
          <option key={uni.id} value={uni.name}>
            {uni.name}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="career"
          className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1"
        >
          Carrera
        </label>
        <input
          type="text"
          id="career"
          name="career"
          value={formData.career}
          onChange={handleInputChange}
          required
          className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary placeholder-gray-500 focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth"
        />
      </div>
      <div>
        <label
          htmlFor="resellerCode"
          className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-1"
        >
          Código de Revendedor (Opcional)
        </label>
        <select
          id="resellerCode"
          name="resellerCode"
          value={formData.resellerCode}
          onChange={handleInputChange}
          className="w-full border dark:bg-dark-primary border-light-primary_h rounded-lg p-3 text-light-black dark:text-dark-secondary focus:ring-2 focus:ring-light-fourth focus:border-light-fourth transition focus:outline-none dark:border-dark-fourth"
        >
          <option value="">Selecciona un código...</option>
          {validResellerCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-light-black dark:text-dark-secondary mb-3">
        Selecciona tus Servicios
      </label>
      <div className="space-y-3">
        {eventData.services?.map((service) => (
          <label
            key={service.id}
            htmlFor={service.id}
            className="flex items-center justify-between p-4 rounded-lg border border-light-primary_h dark:border-dark-fourth transition cursor-pointer hover:border-light-fourth"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id={service.id}
                name={service.id}
                checked={selectedServices[service.id] || false}
                onChange={() => handleServiceChange(service)}
                disabled={service.type === "mandatory"}
                className="h-5 w-5 rounded border-light-primary_h dark:border-dark-fourth text-light-primary focus:ring-light-fourth"
              />
              <span className="ml-3 text-light-black dark:text-dark-secondary font-medium">
                {service.name}
              </span>
            </div>
            <span className="font-semibold text-light-black dark:text-dark-secondary">
              Bs.{" "}
              {service.type === "mandatory"
                ? formData.academicDegree === "estudiante"
                  ? eventData.pricingTiers?.student
                  : eventData.pricingTiers?.professional
                : service.price}
            </span>
          </label>
        ))}
      </div>
    </div>
  </>
);

interface TicketPurchaseProps {
  eventData: EventData;
}

const TicketPurchase: React.FC<TicketPurchaseProps> = ({ eventData }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("qr");
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    academicDegree: "estudiante",
    department: "sc" as Department,
    phone: "",
    institution: "",
    career: "",
    resellerCode: "",
  });

  const [selectedServices, setSelectedServices] = useState<
    Record<string, boolean>
  >(initializeServices(eventData.services));

  const [totalAmount, setTotalAmount] = useState(0);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableUniversities, setAvailableUniversities] = useState<
    University[]
  >([]);
  const [currentStep, setCurrentStep] = useState(1);
  const qrCodeImageUrl = "/images/qr-pago.png";

  useEffect(() => {
    const universities = getUniversitiesByDepartment(formData.department);
    setAvailableUniversities(universities);

    setFormData((prev) => {
      const isCurrentInstitutionValid = universities.some(
        (uni) => uni.name === prev.institution
      );
      if (!isCurrentInstitutionValid) {
        return { ...prev, institution: "" };
      }
      return prev;
    });
  }, [formData.department]);

  useEffect(() => {
    if (!eventData.pricingTiers) {
      console.error("Datos de precios no encontrados para este evento.");
      return;
    }

    const basePrice =
      formData.academicDegree === "estudiante"
        ? eventData.pricingTiers.student
        : eventData.pricingTiers.professional;

    const additionalServicesCost =
      eventData.services?.reduce((total, service) => {
        if (selectedServices[service.id] && service.type !== "mandatory") {
          return total + service.price;
        }
        return total;
      }, 0) || 0;

    setTotalAmount(basePrice + additionalServicesCost);
  }, [
    selectedServices,
    eventData.services,
    eventData.pricingTiers,
    formData.academicDegree,
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceChange = (clickedService: EventService) => {
    if (clickedService.type === "mandatory") return;

    setSelectedServices((prev) => {
      const newState = {
        ...prev,
        [clickedService.id]: !prev[clickedService.id],
      };
      if (clickedService.type === "exclusive" && newState[clickedService.id]) {
        eventData.services?.forEach((service) => {
          if (
            service.exclusiveGroup === clickedService.exclusiveGroup &&
            service.id !== clickedService.id
          ) {
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
      alert(
        "Por favor, completa todos los campos obligatorios para continuar."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = "https://eventhub-backend-jhht.onrender.com/api/submit";

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("lastName", formData.lastName);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("academicDegree", formData.academicDegree);
    payload.append("department", formData.department);
    payload.append("institution", formData.institution);
    payload.append("career", formData.career);
    payload.append("resellerCode", formData.resellerCode);

    const selectedServiceNames =
      eventData.services
        ?.filter((service) => selectedServices[service.id])
        .map((service) => service.name) || [];

    payload.append("selectedServices", JSON.stringify(selectedServiceNames));
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
        console.log("¡Datos enviados con éxito!");
        setCurrentStep(3);
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

  const isStep2Valid = useMemo(() => {
    return proofFile !== null;
  }, [proofFile]);

  const getButtonClass = (method: PaymentMethod) => {
    const baseClasses =
      "flex-1 p-4 rounded-lg text-left transition-all duration-300 flex items-center space-x-3 text-lg font-semibold";
    return selectedMethod === method
      ? `${baseClasses} bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-primary`
      : `${baseClasses} text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary border border-light-fourth dark:border-dark-fourth hover:border-light-fourth_h hover:bg-light-secondary_h`;
  };

  if (currentStep === 3) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ¡Registro Recibido!
        </h3>
        <p className="text-gray-600 text-lg">
          Gracias,{" "}
          <span className="font-semibold text-gray-900">{formData.name}</span>.
          Hemos recibido tu registro. En breve recibirás un correo de
          confirmación.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <h3 className="text-xl sm:text-2xl font-semibold text-light-black dark:text-dark-secondary pb-3 mb-4">
        Adquiere tu Entrada
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => {
            setSelectedMethod("qr");
            setCurrentStep(1);
          }}
          className={getButtonClass("qr")}
        >
          <QrCodeIcon className="w-8 h-8 flex-shrink-0" />
          <span>Pago QR</span>
        </button>
        <button
          onClick={() => {
            setSelectedMethod("cash");
            setCurrentStep(1);
          }}
          className={getButtonClass("cash")}
        >
          <CashIcon className="w-8 h-8 flex-shrink-0" />
          <span>Pago en Taquilla</span>
        </button>
      </div>

      {selectedMethod === "cash" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h4 className="font-semibold text-xl text-light-secondary mb-4 dark:text-dark-secondary">
            Registra tus Datos
          </h4>
          <FormFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleServiceChange={handleServiceChange}
            availableUniversities={availableUniversities}
            selectedServices={selectedServices}
            eventData={eventData}
          />
          <button
            type="submit"
            disabled={!isStep1Valid || isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-lg"
          >
            {isSubmitting
              ? "Enviando..."
              : `Pre-Registrar y Pagar en Puerta - Bs. ${totalAmount}`}
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
              <FormFields
                formData={formData}
                handleInputChange={handleInputChange}
                handleServiceChange={handleServiceChange}
                availableUniversities={availableUniversities}
                selectedServices={selectedServices}
                eventData={eventData}
              />
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={!isStep1Valid || isSubmitting}
                className="w-full bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-primary font-bold py-3 px-4 rounded-lg hover:bg-light-secondary_h dark:hover:bg-dark-secondary_h disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all text-lg"
              >
                {isSubmitting
                  ? "Procesando..."
                  : `Continuar al Pago - Bs. ${totalAmount}`}
              </button>
            </form>
          )}

          {currentStep === 2 && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="font-semibold text-xl text-light-black dark:text-dark-secondary mb-6">
                  Paso 2: Realiza el Pago
                </h4>
                <div className="bg-light-primary_h dark:bg-dark-primary_h p-6 rounded-lg border-2 border-dashed border-light-fourth dark:border-dark-fourth">
                  <img
                    src={qrCodeImageUrl}
                    alt="QR Code para pago"
                    className="mx-auto rounded-lg shadow-md mb-4"
                  />
                  <p className="text-lg font-semibold text-light-black">
                    Monto: Bs. {totalAmount}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <h4 className="font-semibold text-xl text-light-black dark:text-dark-secondary mb-4">
                  Sube tu Comprobante
                </h4>
                <div>
                  <label
                    htmlFor="proof"
                    className="block w-full border-2 border-dashed border-light-fourth rounded-lg p-6 text-center cursor-pointer hover:border-light-fourth_h hover:bg-light-secondary transition-colors"
                  >
                    <UploadIcon className="w-12 h-12 text-light-secondary dark:text-dark-secondary mx-auto mb-4" />
                    <span className="text-lg text-light-secondary dark:text-dark-secondary">
                      {proofFile ? proofFile.name : "Subir comprobante de pago"}
                    </span>
                    <p className="text-sm text-light-secondary dark:text-dark-secondary mt-2">
                      Formatos: JPG, PNG, PDF
                    </p>
                  </label>
                  <input
                    type="file"
                    id="proof"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    required
                    className="hidden"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isStep2Valid || isSubmitting}
                  className="w-full bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-secondary font-bold py-3 px-4 rounded-lg hover:bg-light-secondary_h dark:hover:bg-dark-secondary_h disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all text-lg"
                >
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

export default TicketPurchase;
