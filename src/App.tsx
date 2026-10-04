/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CabinsOverview from './components/CabinsOverview';
import Gallery from './components/Gallery';
import Amenities from './components/Amenities';
import LocationMap from './components/LocationMap';
import FAQSection from './components/FAQSection';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EE] text-[#242A27]">
      {/* Top Header / Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Inicio / Hero — Transmite qué es y dónde está en 3 segundos */}
        <Hero />

        {/* 2. Las cabañas / habitaciones — Qué ofrece, capacidad, cocina, deck */}
        <CabinsOverview />

        {/* 3. Fotos / Galería — 9 fotos reales de las cabañas y el río con lightbox */}
        <Gallery />

        {/* 4. Comodidades — Lista escaneable con iconos */}
        <Amenities />

        {/* 5. Ubicación — Mapa embebido de Google Maps + 2-3 líneas de cómo llegar */}
        <LocationMap />

        {/* 6. Preguntas Frecuentes (FAQ) — Resuelve dudas clave y refuerza SEO local */}
        <FAQSection />

        {/* 7. Precios / Reservar — Precios orientativos y cierre directo por WhatsApp */}
        <BookingSection />
      </main>

      {/* 8. Contacto / Footer — Teléfono, WhatsApp, redes sociales */}
      <Footer />

      {/* Botón flotante permanente de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
