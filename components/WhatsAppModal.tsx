'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, CheckCircle2, Phone, Sparkles } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPhone?: string;
}

export default function WhatsAppModal({
  isOpen,
  onClose,
  defaultPhone = '919568123353',
}: WhatsAppModalProps) {
  const [selectedIntent, setSelectedIntent] = useState('test_ride');
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const quickIntents = [
    { id: 'test_ride', label: '⚡ Book VIP Test Ride', text: 'I want to schedule a VIP track test ride for Green Wheels Apex-1.' },
    { id: 'pricing', label: '💰 Pricing & EMI Options', text: 'Please share the on-road pricing sheet, subsidies, and zero-downpayment EMI plans for Apex-1.' },
    { id: 'showroom', label: '📍 Showroom Visit Appointment', text: 'I would like to visit the Cyber City Flagship Showroom this weekend.' },
    { id: 'specs', label: '🔋 Battery & Delivery Times', text: 'I have inquiries regarding the 4.2 kWh HyperCell battery warranty and expected delivery timeline.' },
  ];

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const activeIntent = quickIntents.find((i) => i.id === selectedIntent)?.text || '';

    let message = `Hello Green Wheels! 👋\n\n`;
    if (userName) message += `*Name:* ${userName}\n`;
    if (userCity) message += `*City:* ${userCity}\n`;
    message += `*Inquiry:* ${activeIntent}\n`;
    if (customNotes) message += `*Additional Note:* ${customNotes}\n`;
    message += `\nLooking forward to speaking with the Green Wheels specialist team.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${defaultPhone}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg rounded-3xl glass-panel bg-[#0d1117] border border-emerald-500/30 p-6 sm:p-8 shadow-2xl glow-green my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <MessageCircle className="w-6 h-6 fill-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  Direct WhatsApp Concierge
                </h3>
                <p className="text-xs font-mono text-emerald-400">
                  Green Wheels Showroom • Typically replies instantly
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              {/* Select Intent */}
              <div>
                <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                  Select Reason for Contact
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickIntents.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedIntent(item.id)}
                      className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${selectedIntent === item.id
                          ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Alex Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1">City / Region</label>
                  <input
                    type="text"
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    placeholder="e.g. Gurugram / Delhi NCR"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Message Preview */}
              <div>
                <label className="block text-[11px] font-mono text-white/50 mb-1">
                  Optional Questions / Preferences
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Preferred test ride date/time or specific questions..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Start WhatsApp Chat (+{defaultPhone})</span>
                </button>
                <p className="text-center text-[10px] text-white/40 mt-2 font-mono">
                  Opens WhatsApp web or mobile app directly with prefilled details.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
