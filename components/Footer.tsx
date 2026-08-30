'use client';

import React from 'react';
import { Zap, MessageCircle, MapPin, ArrowUp, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp: () => void;
  onOpenShowroom: () => void;
}

export default function Footer({ onOpenWhatsApp, onOpenShowroom }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06080a] border-t border-white/10 pt-16 pb-12 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black font-bold">
                <Zap className="w-6 h-6 fill-black" />
              </div>
              <span className="font-display font-black text-2xl tracking-wider text-white">
                GREEN<span className="text-emerald-400">WHEELS</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 max-w-sm leading-relaxed font-light">
              Engineering the next frontier of electric two-wheelers. Precision aerodynamics, explosive acceleration, zero net emissions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                WhatsApp: +91 9568123353
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
              Navigation
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white/60 font-light">
              <li><a href="#overview" className="hover:text-emerald-400 transition-colors">Apex-1 Overview</a></li>
              <li><a href="#specs" className="hover:text-emerald-400 transition-colors">Specifications</a></li>
              <li><a href="#gallery" className="hover:text-emerald-400 transition-colors">Design Gallery</a></li>
              <li><a href="#showroom" className="hover:text-emerald-400 transition-colors">Showroom Locator</a></li>
            </ul>
          </div>

          {/* Legal / Tech */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
              Architecture
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white/60 font-light">
              <li>4.2 kWh HyperCell™</li>
              <li>Dual Vector PMSM Motor</li>
              <li>ApexOS 3.0 Telemetry</li>
              <li>FlashCharge DC System</li>
              <li>6061-T6 Hydroformed Alloy</li>
            </ul>
          </div>

          {/* Showroom & Hours */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
              Showroom Hub
            </div>
            <div className="text-xs text-white/60 space-y-2">
              <p className="text-white/80 font-medium">Sultanpur, Haridwar Road</p>
              <p>Mon - Sun: 10:00 AM - 7:30 PM</p>
              <p className="text-emerald-400 font-mono">+91 9568123353</p>
              <button
                onClick={onOpenShowroom}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline pt-1"
              >
                <MapPin className="w-3.5 h-3.5" /> View on Map
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © {new Date().getFullYear()} Green Wheels Mobility Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
