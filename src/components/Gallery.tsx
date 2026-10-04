import { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import content from '../content.json';
import { getResponsiveSrcSet } from '../utils/imageUtils';

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const photos = content.gallery.photos;

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-[#F6F4EE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#884D34] block mb-2">
            {content.gallery.sectionBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#16353B] mb-3">
            {content.gallery.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#5A6862]">
            {content.gallery.sectionDescription}
          </p>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer bg-[#ECE8DD] border border-[#DDD6C6] shadow-xs"
            >
              <img
                src={photo.src}
                srcSet={getResponsiveSrcSet(photo.src)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                alt={photo.alt || photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-xs text-[#E2ECE6]">{photo.category}</span>
                <span className="text-sm font-semibold">{photo.title}</span>
              </div>
              <div className="absolute top-3 right-3 bg-black/40 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
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
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Photo Viewport */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center">
              <img
                src={photos[selectedPhotoIndex].src}
                srcSet={getResponsiveSrcSet(photos[selectedPhotoIndex].src)}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 1200px"
                alt={photos[selectedPhotoIndex].alt || photos[selectedPhotoIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
              />

              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption */}
            <div className="mt-3 text-center text-white">
              <span className="text-xs text-[#E2ECE6]/80 block">
                {photos[selectedPhotoIndex].category} ({selectedPhotoIndex + 1} de {photos.length})
              </span>
              <h4 className="font-serif text-lg font-bold">
                {photos[selectedPhotoIndex].title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
