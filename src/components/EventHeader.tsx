import React from "react";
// 1. Importa los componentes y módulos de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// 2. Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EventData } from "../types";

interface EventHeaderProps {
  title: string;
  subtitle: string;
  images: string[];
  event: EventData;
}

const EventHeader: React.FC<EventHeaderProps> = ({ images }) => {
  return (
    <header className="relative h-96 md:h-[500px] lg:h-[600px] w-full text-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay oscuro simple para mejor contraste */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 z-20">
        <div className="w-full max-w-4xl mx-auto">
          <EventDetails event={event} />
        </div>
      </div> */}
    </header>
  );
};

export default EventHeader;
