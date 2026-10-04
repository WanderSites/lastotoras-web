import { useState } from 'react';
import content from '../content.json';

export default function BookingSection() {
  const [selectedCabin, setSelectedCabin] = useState(content.cabins.units[0].name);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(content.pricing.guestOptions[0] || '2 personas');
  const [message, setMessage] = useState('');

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `¡Hola ${content.site.name}! Quiero consultar disponibilidad para una estadía:`;
    text += `\n🏡 Cabaña: ${selectedCabin}`;
    if (checkIn && checkOut) {
      text += `\n📅 Fechas: del ${checkIn} al ${checkOut}`;
    }
    text += `\n👥 Cantidad de personas: ${guests}`;
    if (message.trim()) {
      text += `\n💬 Consulta: ${message.trim()}`;
    } else {
      text += `\n¿Tienen lugar para esas fechas y cuál sería el valor total? ¡Gracias!`;
    }

    const url = `https://wa.me/${content.site.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="reservar" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#DDD6C6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#884D34] block mb-2">
            {content.pricing.sectionBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#16353B] mb-3">
            {content.pricing.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#5A6862]">
            {content.pricing.sectionDescription}
          </p>
        </div>

        {/* Interactive WhatsApp Booking Card */}
        <div className="bg-white rounded-2xl border border-[#DDD6C6] p-6 sm:p-8 shadow-sm">
          <div className="max-w-xl mx-auto text-center mb-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16353B] mb-1">
              {content.pricing.formTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#5A6862]">
              {content.pricing.formSubtitle}
            </p>
          </div>

          <form onSubmit={handleWhatsAppBooking} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#5A6862] mb-1">
                {content.pricing.cabinLabel}
              </label>
              <select
                value={selectedCabin}
                onChange={(e) => setSelectedCabin(e.target.value)}
                className="w-full text-xs sm:text-sm bg-[#FAF8F5] border border-[#DDD6C6] rounded-xl px-3 py-2.5 text-[#202724] font-medium focus:outline-none focus:ring-1 focus:ring-[#1F4952]"
              >
                {content.cabins.units.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name} ({u.capacity})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A6862] mb-1">
                {content.pricing.checkInLabel}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-xs sm:text-sm bg-[#FAF8F5] border border-[#DDD6C6] rounded-xl px-3 py-2 text-[#202724] focus:outline-none focus:ring-1 focus:ring-[#1F4952]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A6862] mb-1">
                {content.pricing.checkOutLabel}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-xs sm:text-sm bg-[#FAF8F5] border border-[#DDD6C6] rounded-xl px-3 py-2 text-[#202724] focus:outline-none focus:ring-1 focus:ring-[#1F4952]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A6862] mb-1">
                {content.pricing.guestsLabel}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full text-xs sm:text-sm bg-[#FAF8F5] border border-[#DDD6C6] rounded-xl px-3 py-2.5 text-[#202724] font-medium focus:outline-none focus:ring-1 focus:ring-[#1F4952]"
              >
                {content.pricing.guestOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={content.pricing.notesPlaceholder}
                className="w-full text-xs bg-[#FAF8F5] border border-[#DDD6C6] rounded-xl px-3.5 py-2.5 text-[#202724] focus:outline-none focus:ring-1 focus:ring-[#1F4952]"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer h-full min-h-[40px]"
              >
                <img
                  src="/images/whatsappblanco.png"
                  alt="WhatsApp"
                  className="w-4 h-4 object-contain"
                />
                <span>{content.pricing.submitButtonText}</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </section>
  );
}
