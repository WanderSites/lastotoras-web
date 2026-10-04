import content from '../content.json';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${content.site.whatsappNumber}?text=${encodeURIComponent(
    content.floatingWhatsApp.defaultMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-md transition-all duration-200 hover:scale-105 active:scale-95 group"
      aria-label={content.floatingWhatsApp.buttonText}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16353B]"></span>
      </span>
      <img
        src="/images/whatsappblanco.png"
        alt="WhatsApp"
        className="w-4.5 h-4.5 sm:w-5 sm:h-5 object-contain shrink-0"
      />
      <span className="text-xs font-semibold tracking-normal pr-0.5">
        {content.floatingWhatsApp.buttonText}
      </span>
    </a>
  );
}
