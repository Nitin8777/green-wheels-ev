'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onOpenWhatsApp: () => void;
}

export default function ContactSection({ onOpenWhatsApp }: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Test Ride',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format message and open WhatsApp as direct conduit
    const text = `*New Website Inquiry*\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Interest:* ${formData.interest}\n*Message:* ${formData.message}`;
    const url = `https://wa.me/919568123353?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-12 bg-[#0b0d10] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-emerald-400 text-xs font-mono tracking-wider uppercase mb-4 glow-green-sm">
              <Phone className="w-3.5 h-3.5" />
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-6">
              CONNECT WITH OUR <br />
              <span className="text-gradient-green">CONCIERGE TEAM.</span>
            </h2>
            <p className="text-white/60 text-base font-light leading-relaxed mb-8">
              Whether you are scheduling a private track demonstration, inquiring about institutional fleet orders, or customized color finishes, we are at your service.
            </p>

            <div className="space-y-4">
              <div
                onClick={onOpenWhatsApp}
                className="group glass-panel p-5 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-emerald-400">Direct WhatsApp</div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-300">
                    +91 9568123353
                  </div>
                  <div className="text-[11px] text-white/40">Instant reply during showroom hours</div>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-white/50">Email Inquiries</div>
                  <a href="mailto:concierge@greenwheels.ev" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                    concierge@greenwheels.ev
                  </a>
                  <div className="text-[11px] text-white/40">VIP customer & press relations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative"
            >
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-white/50 mb-6">
                Fill the form below to initiate an immediate WhatsApp priority booking.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9568123353"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Primary Interest</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#10141a] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="VIP Track Test Ride">VIP Track Test Ride</option>
                      <option value="Pricing, Subsidies & EMI">Pricing, Subsidies & EMI</option>
                      <option value="Showroom Visit Booking">Showroom Visit Booking</option>
                      <option value="Fleet / Corporate Order">Fleet / Corporate Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Message / Note</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are looking for..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-101 active:scale-99"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Send via WhatsApp Concierge</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
