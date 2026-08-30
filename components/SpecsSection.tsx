'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, BatteryMedium, Cpu, ShieldAlert, Navigation, Compass, Wind, Sparkles } from 'lucide-react';

const specs = [
  {
    icon: Gauge,
    label: 'Acceleration (0-60 km/h)',
    value: '2.8s',
    highlight: 'HyperBoost Mode',
    desc: 'Instant peak torque delivery with zero lag via dual vector control.',
  },
  {
    icon: BatteryMedium,
    label: 'Certified Real-World Range',
    value: '160 km',
    highlight: '4.2 kWh HyperCell',
    desc: 'High-density NMC cells with intelligent multi-stage regenerative braking.',
  },
  {
    icon: Wind,
    label: 'Top Track Velocity',
    value: '80 - 100 km/h',
    highlight: 'Dual PMSM Motor',
    desc: 'Peak output of 8.5 kW with active thermal dissipation casing.',
  },
  {
    icon: Cpu,
    label: 'Charging Time (0-80%)',
    value: '45 mins',
    highlight: 'FlashCharge Ultra',
    desc: 'Compatible with standard 15A home sockets & DC fast charging grid.',
  },
  {
    icon: ShieldAlert,
    label: 'Chassis & Protection',
    value: 'IP67 / 6061-T6',
    highlight: 'Military-Grade Alloy',
    desc: 'Water, dust and corrosion-proof enclosure with impact crumple zones.',
  },
  {
    icon: Navigation,
    label: 'Cockpit OS',
    value: 'ApexOS 3.0',
    highlight: '7" AMOLED Touch',
    desc: 'Turn-by-turn navigation, cellular LTE, OTA updates, and theft tracking.',
  },
];

export default function SpecsSection() {
  return (
    <section id="specs" className="relative py-28 px-6 sm:px-12 bg-[#0b0d10] border-t border-white/5 overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-emerald-400 text-xs font-mono tracking-wider uppercase mb-4 glow-green-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Benchmarks
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-6">
            RACE-BRED PERFORMANCE. <br />
            <span className="text-gradient-green">ZERO COMPROMISE.</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed">
            Every component in the Green Wheels Apex-1 has been aerodynamically tuned and stress-tested to redefine urban velocity.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {specs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-panel p-8 rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-emerald-400/90 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      {item.highlight}
                    </span>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-2">
                    {item.label}
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-display text-white group-hover:text-emerald-400 transition-colors mb-3">
                    {item.value}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed border-t border-white/10 pt-4 mt-2">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
