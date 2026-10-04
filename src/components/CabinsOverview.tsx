import { useState, useEffect } from 'react';
import { Bed, Check, ChevronLeft, ChevronRight, Camera, Maximize2, X } from 'lucide-react';
import content from '../content.json';
import { getResponsiveSrcSet } from '../utils/imageUtils';

interface CabinUnitProps {
  unit: (typeof content.cabins.units)[0] & { photos?: string[] };
  onOpenLightbox: (cabinName: string, photos: string[], index: number) => void;
}

function CabinCard({ unit, onOpenLightbox }: CabinUnitProps) {
  const photos = unit.photos && unit.photos.length > 0 ? unit.photos : [unit.image];
  const [photoIndex, setPhotoIndex] = useState(0);

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DDD6C6] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
      {/* Photo carousel with click-to-enlarge */}
      <div
        onClick={() => onOpenLightbox(unit.name, photos, photoIndex)}
        className="relative aspect-16/10 overflow-hidden bg-[#ECE8DD] group select-none cursor-pointer"
        title="Clic para agrandar foto"
      >
        <img
          src={photos[photoIndex]}
          srcSet={getResponsiveSrcSet(photos[photoIndex])}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          alt={`${unit.name} - Foto ${photoIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Capacity badge */}
        <div className="absolute bottom-3 left-3 bg-[#16353B]/85 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1 rounded-md pointer-events-none">
          {unit.capacity}
        </div>

        {/* Expand indicator icon */}
        <div className="absolute top-3 left-3 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-lg opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>

        {/* Photo counter badge */}
        {photos.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 pointer-events-none">
            <Camera className="w-3 h-3" />
            <span>{photoIndex + 1}/{photos.length}</span>
          </div>
        )}

        {/* Carousel controls if multiple photos */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#16353B] flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer z-10"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#16353B] flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer z-10"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                    i === photoIndex ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                  aria-label={`Ver foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#16353B] mb-1">
            {unit.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-[#884D34] font-medium mb-3">
            <Bed className="w-3.5 h-3.5" />
            <span>{unit.beds}</span>
          </div>

          <p className="text-xs sm:text-sm text-[#5A6862] leading-relaxed mb-4">
            {unit.description}
          </p>

          {/* Bullet features */}
          <ul className="space-y-2 text-xs text-[#202724] border-t border-[#ECE8DD] pt-3.5">
            {unit.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#2D5844] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CabinsOverview() {
  const [lightbox, setLightbox] = useState<{
    cabinName: string;
    photos: string[];
    index: number;
  } | null>(null);

  const openLightbox = (cabinName: string, photos: string[], index: number) => {
    setLightbox({ cabinName, photos, index });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const nextLightboxPhoto = () => {
    if (lightbox) {
      setLightbox({
        ...lightbox,
        index: (lightbox.index + 1) % lightbox.photos.length,
      });
    }
  };

  const prevLightboxPhoto = () => {
    if (lightbox) {
      setLightbox({
        ...lightbox,
        index: (lightbox.index - 1 + lightbox.photos.length) % lightbox.photos.length,
      });
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxPhoto();
      if (e.key === 'ArrowLeft') prevLightboxPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  return (
    <section id="cabanas" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#DDD6C6] relative">
      <span id="cabana" className="sr-only pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#884D34] block mb-2">
            {content.cabins.sectionBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#16353B] mb-3">
            {content.cabins.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#5A6862] leading-relaxed">
            {content.cabins.sectionDescription}
          </p>
        </div>

        {/* Cabins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {content.cabins.units.map((unit) => (
            <CabinCard
              key={unit.id}
              unit={unit}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>

      </div>

      {/* Lightbox Modal (like in the photo gallery) */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full cursor-pointer transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Photo Viewport */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center">
              <img
                src={lightbox.photos[lightbox.index]}
                srcSet={getResponsiveSrcSet(lightbox.photos[lightbox.index])}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 1200px"
                alt={`Cabaña ${lightbox.cabinName} - Foto ${lightbox.index + 1}`}
                className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
              />

              {lightbox.photos.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2.5 rounded-full hover:bg-black/90 transition-colors cursor-pointer"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextLightboxPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2.5 rounded-full hover:bg-black/90 transition-colors cursor-pointer"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="mt-4 text-center text-white">
              <span className="text-xs text-[#E2ECE6]/80 block mb-1">
                Cabaña {lightbox.cabinName} ({lightbox.index + 1} de {lightbox.photos.length})
              </span>
              <h4 className="font-serif text-lg font-bold">
                {lightbox.cabinName}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
