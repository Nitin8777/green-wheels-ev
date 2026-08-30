'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MapPin, MessageCircle, Menu, X, PhoneCall, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenWhatsApp: () => void;
  onOpenShowroom: () => void;
}

export default function Navbar({ onOpenWhatsApp, onOpenShowroom }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkShowroomStatus = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const openMinutes = 10 * 60; // 10:00 AM
      const closeMinutes = 19 * 60 + 30; // 7:30 PM
      setIsOpenNow(currentMinutes >= openMinutes && currentMinutes < closeMinutes);
    };

    checkShowroomStatus();
    const interval = setInterval(checkShowroomStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Specs', href: '#specs' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Showroom', href: '#showroom' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 pt-4 sm:pt-6">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-7 py-3 flex items-center justify-between ${
          scrolled
            ? 'glass-nav bg-[#0b0d10]/90 border border-white/10 shadow-2xl backdrop-blur-2xl py-2.5'
            : 'bg-black/40 border border-white/10 backdrop-blur-md'
        }`}
      >
        {/* Brand Logo */}
        <a href="#overview" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg tracking-wider text-white">
              GREEN<span className="text-emerald-400">WHEELS</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-emerald-400/80 -mt-1 uppercase">
              Electric Apex
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Area: Showroom Hours & Actions */}
        <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
          {/* Showroom Timing & Live Status Badge */}
          <button
            onClick={onOpenShowroom}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 hover:border-emerald-500/40 text-xs font-mono transition-all group bg-white/[0.03] hover:bg-white/[0.07]"
            title="Showroom Hours: 10:00 AM to 7:30 PM (Click to locate)"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </span>
            <Clock className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
              <span className={isOpenNow ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                {isOpenNow ? 'Open' : 'Closed'}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-white/90 font-medium">10:00 AM – 7:30 PM</span>
            </div>
          </button>

          {/* WhatsApp Us CTA */}
          <button
            onClick={onOpenWhatsApp}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black" />
            <span>WhatsApp Us</span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full glass-panel text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl glass-panel bg-[#0b0d10]/95 border border-white/10 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              {/* Mobile Showroom Timing Banner */}
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShowroom();
                }}
                className="p-3.5 rounded-2xl glass-panel border border-white/10 flex items-center justify-between text-xs font-mono cursor-pointer hover:border-emerald-500/30 transition-all bg-white/[0.02]"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/80">Showroom Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  <span className={isOpenNow ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                    {isOpenNow ? 'Open Now' : 'Closed'} (10 AM – 7:30 PM)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenShowroom();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-panel text-white text-xs font-semibold hover:border-emerald-500/40"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Showroom
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWhatsApp();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-black text-xs font-bold shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
