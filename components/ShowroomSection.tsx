'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, MessageCircle, Calendar, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface ShowroomSectionProps {
  onOpenWhatsApp: () => void;
}

export default function ShowroomSection({ onOpenWhatsApp }: ShowroomSectionProps) {
  const showroomDetails = {
    name: 'Green Wheels Experience Centre & Flagship Showroom',
    address: 'SULTANPUR-BEFORE GRAMIN BANK',
    city: 'Lakser-Haridwar road, UTTARAKHAND, HARIDWAR',
    phone: '+91 9568123353',
    whatsapp: '+919568123353',
    hours: 'Monday – Sunday: 10:00 AM – 7:30 PM',
    mapUrl: 'https://www.google.com/maps/place/GREEN+WHEELS+ELECTRIC+SCOOTER/@29.7559132,78.1008416,21z/data=!4m6!3m5!1s0x390951002db7804b:0xec0ab42f212961e8!8m2!3d29.7560243!4d78.1008518!16s%2Fg%2F11n4046c43?entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D',
  };

  const amenities = [
    'Live Deconstructed Chassis Display',
    '3.5 kW FlashCharge Demo Hub',
    'Private VIP Track Test Rides',
    'Certified EV Specialists & Technicians',
    'Same-Day Delivery & Finance Desk',
  ];

  return (
    <section id="showroom" className="relative py-28 px-6 sm:px-12 bg-[#080a0d] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-emerald-400 text-xs font-mono tracking-wider uppercase mb-4 glow-green-sm">
            <MapPin className="w-3.5 h-3.5" />
            Flagship Experience Centre
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
            VISIT THE GREEN WHEELS <br />
            <span className="text-gradient-green">FLAGSHIP SHOWROOM</span>
          </h2>
          <p className="text-white/60 text-base font-light leading-relaxed">
            Step into our state-of-the-art studio. Feel the ergonomic balance, test the throttle acceleration on our private track, and meet our engineers.
          </p>
        </div>

        {/* Showroom Card Grid */}
        <div className="grid grid-cols-1 gap-8 items-stretch">
          {/* Left: Location & Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between max-w-4xl"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {showroomDetails.name}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    Authorised Flagship Experience Hub
                  </p>
                </div>
              </div>

              {/* Info Blocks */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 text-sm text-white/80">
                  <Navigation className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-xs font-mono text-white/40 uppercase">Address</div>
                    <div>{showroomDetails.address}</div>
                    <div className="text-white/60">{showroomDetails.city}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-white/80">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-xs font-mono text-white/40 uppercase">Working Hours</div>
                    <div>{showroomDetails.hours}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-white/80">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-xs font-mono text-white/40 uppercase">Direct Helpline</div>
                    <a href={`tel:${showroomDetails.phone}`} className="hover:text-emerald-400 transition-colors">
                      {showroomDetails.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3">
                  Showroom Exclusive Features
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-xs text-white/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <button
                onClick={onOpenWhatsApp}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all hover:scale-102"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                Book Test Ride on WhatsApp
              </button>

              <a
                href={showroomDetails.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl glass-panel hover:bg-white/10 text-white font-medium text-sm border border-white/20 transition-all"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                Open in Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
