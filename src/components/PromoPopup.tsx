import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import content from '../content.json';

export default function PromoPopup() {
  const popupConfig = (content as Record<string, any>).popup;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!popupConfig || !popupConfig.enabled) {
      return;
    }

    // Check if user already dismissed the pop-up during this session
    try {
      const isDismissed = sessionStorage.getItem('lastotoras_popup_dismissed');
      if (isDismissed === 'true') {
        return;
      }
    } catch {
      // Ignore storage access errors if in restricted iframe/browser mode
    }

    // Display after 1.2s delay for pleasant entrance
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [popupConfig]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('lastotoras_popup_dismissed', 'true');
    } catch {
      // Ignore storage access errors
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!popupConfig || !popupConfig.enabled || !isOpen) {
    return null;
  }

  const {
    image,
    alt,
    title,
    showButton,
    buttonText,
    buttonLink,
  } = popupConfig;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || alt || 'Pop-up informativo'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#DDD6C6] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-colors cursor-pointer shadow-md"
          aria-label="Cerrar pop-up"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pop-up Image */}
        {image && (
          <div className="relative w-full bg-[#EAE5D8] max-h-80 sm:max-h-96 overflow-hidden flex items-center justify-center">
            {buttonLink && showButton ? (
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <img
                  src={image}
                  alt={alt || 'Novedades Las Totoras'}
                  className="w-full h-auto max-h-80 sm:max-h-96 object-cover hover:opacity-95 transition-opacity"
                  loading="eager"
                />
              </a>
            ) : (
              <img
                src={image}
                alt={alt || 'Novedades Las Totoras'}
                className="w-full h-auto max-h-80 sm:max-h-96 object-cover"
                loading="eager"
              />
            )}
          </div>
        )}

        {/* Content body if title or button exists */}
        {(title || (showButton && buttonLink && buttonText)) && (
          <div className="p-5 sm:p-6 bg-[#FAF8F5] text-center flex flex-col items-center">
            {title && (
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#16353B] mb-2 leading-snug">
                {title}
              </h3>
            )}

            {showButton && buttonLink && buttonText && (
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-[#16353B] hover:bg-[#1E434B] text-white text-base font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-98"
              >
                <span>{buttonText}</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
