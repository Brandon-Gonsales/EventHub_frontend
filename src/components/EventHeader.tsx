import React from 'react';
// 1. Importa los componentes y módulos de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// 2. Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


// 3. Actualiza las props para aceptar un array de imágenes
interface EventHeaderProps {
  title: string;
  subtitle: string;
  images: string[];
}

const EventHeader: React.FC<EventHeaderProps> = ({ images }) => {
  return (
    <header 
      // La altura se mantiene en el contenedor principal
      className="relative h-96 md:h-[500px] w-full text-white"
    >
      <Swiper
        // 4. Configura el carrusel
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
        {/* 5. Mapea las imágenes para crear cada slide */}
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* 6. El contenido de texto se superpone al carrusel */}
      {/*<div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center p-4 z-20">
        <div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-lg animate-fade-in">
            {title}
          </h1>
          <p className="mt-2 text-xl md:text-2xl font-light text-sky-300 drop-shadow-md animate-fade-in">
            {subtitle}
          </p>
        </div>
      </div>*/}
    </header>
  );
};

export default EventHeader;