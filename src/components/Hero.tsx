import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import content from '../content.json';
import { getResponsiveSrcSet } from '../utils/imageUtils';

export default function Hero() {
  const images = content.hero.sliderImages && content.hero.sliderImages.length > 0
    ? content.hero.sliderImages
    : [{ src: content.hero.backgroundImage, alt: content.hero.title }];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slideshow transition every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section id="inicio" className="bg-[#F6F4EE]">
      {/* Semantic H1 for SEO (Accessible & Crawlable) */}
      <h1 className="sr-only">Las Totoras · Cabañas sobre el Río Gualeguaychú en Entre Ríos</h1>

      {/* 1. High-Impact Clean Photo Carousel */}
      <div className="relative w-full h-[58vh] sm:h-[68vh] md:h-[75vh] lg:h-[82vh] overflow-hidden bg-[#16353B] group">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={image.src}
                srcSet={getResponsiveSrcSet(image.src)}
                sizes="100vw"
                alt={image.alt}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding={index === 0 ? 'sync' : 'async'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </div>
          );
        })}

        {/* Soft edge gradient at bottom for smooth visual transition */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-20" />

        {/* Carousel Prev / Next Controls (appear subtly on hover) */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Foto siguiente"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Indicator Dots / Bars */}
        <div className="absolute bottom-5 inset-x-0 z-30 flex items-center justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir a foto ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
