import { Phone, Instagram, MapPin, Mail } from 'lucide-react';
import content from '../content.json';

export default function Footer() {
  const whatsappUrl = `https://wa.me/${content.site.whatsappNumber}?text=${encodeURIComponent(
    `¡Hola ${content.site.name}! Quiero hacer una consulta sobre la cabaña.`
  )}`;

  return (
    <footer id="contacto" className="bg-[#16353B] text-white pt-12 pb-20 sm:pb-14 border-t border-[#0E2226]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-white/10">
          
          {/* Brand & Place */}
          <div className="max-w-md">
            {(content.site.logoWhite || content.site.logo) ? (
              <a href="#" className="inline-block mb-3.5 transition-opacity hover:opacity-90">
                <img
                  src={content.site.logoWhite || content.site.logo}
                  alt={`${content.site.name} - Cabañas y Río en Entre Ríos`}
                  className="h-11 sm:h-13 w-auto object-contain"
                />
              </a>
            ) : (
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                {content.site.name}
              </h3>
            )}
            <p className="text-xs sm:text-sm text-[#E2ECE6]/80 leading-relaxed mb-3">
              {content.hero.subtitle}
            </p>
            {/* Address */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/85">
              <MapPin className="w-4 h-4 text-[#E68A64] shrink-0" />
              <span>{content.site.address}</span>
            </div>
          </div>

          {/* Contact Details Grid / List - all icons unified in orange (#E68A64) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm">
            
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-white/90 hover:text-white transition-colors font-medium"
            >
              <svg
                className="w-4 h-4 text-[#E68A64] fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp: {content.site.whatsappDisplay}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${content.site.email}`}
              className="flex items-center gap-2.5 text-white/90 hover:text-white transition-colors font-medium"
            >
              <Mail className="w-4 h-4 text-[#E68A64] shrink-0" />
              <span>{content.site.email}</span>
            </a>

            {/* Phone */}
            <div className="flex items-center gap-2.5 text-white/90">
              <Phone className="w-4 h-4 text-[#E68A64] shrink-0" />
              <span>Tel: {content.site.phoneDisplay}</span>
            </div>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#E68A64] shrink-0" />
              <span>{content.site.instagram}</span>
            </a>

          </div>

        </div>

        {/* Centered copyright line */}
        <div className="pt-8 text-center text-xs text-[#E2ECE6]/60">
          <p>
            © {new Date().getFullYear()} {content.site.name}. {content.footer.copyright} · {content.footer.createdBy}
          </p>
        </div>

      </div>
    </footer>
  );
}
