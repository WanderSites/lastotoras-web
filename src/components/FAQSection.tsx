import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import content from '../content.json';

export default function FAQSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#DDD6C6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#884D34] block mb-2">
            {content.faq.sectionBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#16353B] mb-3">
            {content.faq.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#5A6862]">
            {content.faq.sectionDescription}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {content.faq.items.map((item, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#DDD6C6] overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full py-4.5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#16353B]">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#EAE5D8] flex items-center justify-center shrink-0 text-[#16353B] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#16353B] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[#47544F] leading-relaxed border-t border-[#EFECE4]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Footer CTA */}
        <div className="mt-10 p-6 bg-[#ECE8DD] rounded-2xl border border-[#DDD6C6] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16353B] text-white flex items-center justify-center shrink-0">
              <MessageCircleQuestion className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#16353B] text-sm sm:text-base">
                ¿Tenés otra consulta sobre tu estadía?
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6862]">
                Escribinos por WhatsApp y te asesoramos al instante.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=${encodeURIComponent(
              '¡Hola Las Totoras! Tengo una consulta sobre las cabañas y disponibilidad.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold rounded-xl transition-all shadow-xs shrink-0"
          >
            Consultar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
