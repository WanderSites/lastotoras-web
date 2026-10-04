import { MapPin, ExternalLink, Navigation, Compass, Waves, Sparkles } from 'lucide-react';
import content from '../content.json';

export default function LocationMap() {
  const highlightIcons = [Navigation, Waves, Sparkles, Compass];

  return (
    <section id="ubicacion" className="py-16 sm:py-24 bg-[#F6F4EE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#884D34] block mb-2">
            {content.location.sectionBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#16353B] mb-3">
            {content.location.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#5A6862] leading-relaxed">
            {content.location.description}
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl border border-[#DDD6C6] overflow-hidden shadow-xs mb-8">
          
          {/* Embedded Google Maps iframe */}
          <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-[#ECE8DD]">
            <iframe
              title={`Ubicación de ${content.site.name} en ${content.site.location}`}
              src={content.site.googleMapsIframeUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Bottom quick details */}
          <div className="p-4 sm:p-6 bg-[#FAF8F5] border-t border-[#DDD6C6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#242A27]">
              <MapPin className="w-4 h-4 text-[#884D34] shrink-0" />
              <span>{content.site.address}</span>
            </div>

            <a
              href={content.site.googleMapsSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1F4952] hover:text-[#16353B] hover:underline"
            >
              <span>{content.location.openMapsText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Local highlights / Context cards for local SEO & travelers */}
        {content.location.highlights && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.location.highlights.map((item, idx) => {
              const IconComponent = highlightIcons[idx % highlightIcons.length];
              return (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-xs p-5 rounded-xl border border-[#DDD6C6] shadow-xs flex flex-col justify-start"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#EAE5D8] text-[#16353B] flex items-center justify-center mb-3">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#16353B] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A6862] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
