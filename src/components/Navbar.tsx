import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import content from '../content.json';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F6F4EE]/95 backdrop-blur-md border-b border-[#DDD6C6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between pt-2.5 pb-2 sm:pb-2.5 min-h-[4.5rem] sm:min-h-[5rem]">
          
          {/* Logo / Brand Name */}
          <a href="#" className="flex items-end group">
            {content.site.logo ? (
              <img
                src={content.site.logo}
                alt={`${content.site.name} - Cabañas sobre el Río Gualeguaychú`}
                className="h-11 sm:h-12 md:h-14 w-auto max-w-[190px] sm:max-w-[220px] object-contain transition-transform duration-200 group-hover:scale-102 block"
              />
            ) : (
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#16353B] group-hover:text-[#2D5844] transition-colors leading-none pb-0.5">
                {content.site.name}
              </span>
            )}
          </a>

          {/* Clean Desktop Navigation Links - lowered further down */}
          <nav className="hidden md:flex items-end gap-6 lg:gap-8 text-base font-bold text-[#242A27] pb-1 sm:pb-1">
            {content.nav.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-[#16353B] transition-colors pb-0.5 leading-none tracking-tight"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA aligned with the base of the logo - matching footer color #16353B */}
          <div className="hidden sm:flex items-end pb-0 sm:pb-0.5">
            <a
              href="#reservar"
              className="inline-flex items-center justify-center px-5.5 py-2.5 bg-[#16353B] hover:bg-[#1E434B] text-white text-base font-bold rounded-xl transition-all shadow-xs hover:shadow-sm active:scale-98 tracking-tight"
            >
              <span>Reserva ahora</span>
            </a>
          </div>

          {/* Mobile hamburger aligned with the base */}
          <div className="flex md:hidden items-end pb-0.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#16353B] rounded-xl hover:bg-[#ECE8DD] transition-colors"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#F6F4EE] border-b border-[#DDD6C6] px-5 py-4 flex flex-col gap-3">
          {content.nav.links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold text-[#202724] py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservar"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-3 bg-[#16353B] hover:bg-[#1E434B] text-white text-base font-bold rounded-xl flex items-center justify-center shadow-xs"
          >
            <span>Reserva ahora</span>
          </a>
        </nav>
      )}
    </header>
  );
}
