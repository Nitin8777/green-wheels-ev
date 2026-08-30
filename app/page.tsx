'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ScooterScroll from '@/components/ScooterScroll';
import SpecsSection from '@/components/SpecsSection';
import GallerySection from '@/components/GallerySection';
import ShowroomSection from '@/components/ShowroomSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppModal from '@/components/WhatsAppModal';
import WhatsAppFAB from '@/components/WhatsAppFAB';

export default function LandingPage() {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    setIsWhatsAppModalOpen(true);
  };

  const handleCloseWhatsApp = () => {
    setIsWhatsAppModalOpen(false);
  };

  const handleScrollToShowroom = () => {
    const el = document.getElementById('showroom');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0d10] text-slate-100 relative overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      {/* Blurry Top Navigation Bar */}
      <Navbar
        onOpenWhatsApp={handleOpenWhatsApp}
        onOpenShowroom={handleScrollToShowroom}
      />

      {/* Interactive Sticky Canvas Scrollytelling Component (Continuous Assemble / Disassemble Loop) */}
      <ScooterScroll />

      {/* Website Functioning & Lower Sections */}
      <div id="ecosystem" className="relative z-30 bg-[#0b0d10]">
        {/* Technical Specifications Section */}
        <SpecsSection />

        {/* Dynamic Structural Visual Breakdown Gallery */}
        <GallerySection />

        {/* Flagship Showroom Location & Telemetry */}
        <ShowroomSection onOpenWhatsApp={handleOpenWhatsApp} />

        {/* Direct Contact & WhatsApp Concierge Form */}
        <ContactSection onOpenWhatsApp={handleOpenWhatsApp} />

        {/* Footer */}
        <Footer
          onOpenWhatsApp={handleOpenWhatsApp}
          onOpenShowroom={handleScrollToShowroom}
        />
      </div>

      {/* Interactive WhatsApp Booking Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={handleCloseWhatsApp}
        defaultPhone="919568123353"
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB onOpen={handleOpenWhatsApp} />
    </main>
  );
}
