'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Globe, ShieldCheck, Zap } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: Leaf,
      title: 'Zero Net Carbon',
      desc: '100% sustainably manufactured in our solar-powered smart gigafactory with recycled aerospace aluminum alloys.',
    },
    {
      icon: Zap,
      title: 'Proprietary Battery Tech',
      desc: 'Solid-state and NMC hybrid chemistry ensuring 2,000+ charge cycles without degradation.',
    },
    {
      icon: Award,
      title: 'Awwwards Design Standard',
      desc: 'Form follows function. Sculpted for aerodynamic efficiency with class-leading CD of 0.29.',
    },
    {
      icon: Globe,
      title: 'Global Fast-Charging Grid',
      desc: 'Access over 12,000+ ultra-fast charging points seamlessly mapped into the onboard ApexOS navigation.',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-6 sm:px-12 bg-[#0b0d10] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-emerald-400 text-xs font-mono tracking-wider uppercase mb-4 glow-green-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              The Green Wheels Philosophy
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.1] mb-6">
              REINVENTING THE SOUL OF <br />
              <span className="text-gradient-green">ELECTRIC MOBILITY.</span>
            </h2>
            <p className="text-white/70 text-base font-light leading-relaxed mb-6">
              At <strong className="text-white font-medium">Green Wheels</strong>, we believe high-performance electric vehicles shouldn’t just replace combustion engines—they should outperform them in every conceivable dimension.
            </p>
            <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
              From our silent liquid-cooled PMSM motors to our modular frame architecture, every millimeter of the Apex-1 is built for discerning riders who demand adrenaline and environmental stewardship.
            </p>

            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="text-3xl font-extrabold font-display text-emerald-400">100%</div>
                <div className="text-xs font-mono text-white/50">Renewable Energy Built</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-3xl font-extrabold font-display text-white">5-Year</div>
                <div className="text-xs font-mono text-white/50">Comprehensive Warranty</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:bg-white/[0.03]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
