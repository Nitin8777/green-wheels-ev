'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Maximize2, Shield, Eye, Cpu, Zap } from 'lucide-react';

const galleryItems = [
  {
    title: 'CEEON Dark Edition - Matrix LED Stance',
    category: 'Signature Series',
    frame: '/gallery/gallery-1.jpg',
    desc: 'High-intensity dual LED optics with signature daytime running halos, aerodynamic cowl, and front hydraulic disc braking.',
  },
  {
    title: 'CEEON Ultra - Dynamic Urban Stance',
    category: 'Aerodynamic Body',
    frame: '/gallery/gallery-2.jpg',
    desc: 'Streamlined front apron with integrated horizon DRL lightbar and reinforced telescopic suspension for all-terrain stability.',
  },
  {
    title: 'CEEON Sport - Fleet Lineup',
    category: 'Sport Edition',
    frame: '/gallery/gallery-3.jpg',
    desc: 'Aggressive sport-accented styling, dual-tone textured body cladding, and high-tensile all-weather tubular chassis.',
  },
  {
    title: 'CEEON Pearl Edition - Flagship Showroom',
    category: 'Luxury Series',
    frame: '/gallery/gallery-4.jpg',
    desc: 'Metallic pearl finish with champagne satin accents, crystalline projection lighting, and spacious ergonomic floorboard.',
  },
];

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-28 px-6 sm:px-12 bg-[#080a0d] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-emerald-400 text-xs font-mono tracking-wider uppercase mb-4 glow-green-sm">
              <Eye className="w-3.5 h-3.5" />
              Visual Architecture
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              PRECISION CRAFTED. <br />
              <span className="text-gradient-green">INSIDE AND OUT.</span>
            </h2>
          </div>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-md">
            Click on any structural viewpoint to examine the microscopic engineering tolerances of the Apex-1.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setActiveImage(item.frame)}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-emerald-500/40 transition-all duration-500 cursor-pointer bg-[#10141a]"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#12161f] flex items-center justify-center">
                <img
                  src={item.frame}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle vignette over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10141a] via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/70 group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-all z-10 shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-white/40">VIEW 0{idx + 1}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-10 cursor-zoom-out"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={activeImage}
              alt="Enlarged EV Scooter frame"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
            <p className="absolute bottom-4 text-xs font-mono text-white/70 bg-black/60 px-4 py-1.5 rounded-full border border-white/10">
              Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
