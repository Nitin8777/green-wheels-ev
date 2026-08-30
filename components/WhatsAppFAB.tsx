'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppFABProps {
  onOpen: () => void;
}

export default function WhatsAppFAB({ onOpen }: WhatsAppFABProps) {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Dynamic Notification Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2.5 glass-panel bg-[#0e1217]/90 px-4 py-2.5 rounded-2xl border border-emerald-500/30 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-xs text-white">
              <span className="font-semibold text-emerald-400">Online: </span>
              Book VIP Test Ride on WhatsApp
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-white/40 hover:text-white ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={onOpen}
        className="relative group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-2xl shadow-emerald-500/40 glow-green-sm transition-all"
        aria-label="Contact via WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-black stroke-black relative z-10" />
      </motion.button>
    </div>
  );
}
