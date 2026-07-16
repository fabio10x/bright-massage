import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Flame, Sparkles, Clock3, Compass, CheckCircle2, X, ShieldCheck } from 'lucide-react';
import { MassageService } from '../types';
import { useAppData } from '../hooks/useAppData';

interface ServicesViewProps {
  setActiveTab: (tab: string) => void;
}

const getServiceImage = (id: string) => {
  switch (id) {
    case 'royal-hammam':
      return '/images/hammam_steam_room_1784194541253.jpg';
    case 'deep-clay':
      return '/images/glistening_back_massage_1784194946250.jpg';
    case 'atlas-argan':
      return '/images/glistening_massage_oil_1784194564535.jpg';
    case 'berber-stones':
      return '/images/glowing_spa_massage_1784194956492.jpg';
    case 'orange-blossom-scalp':
      return '/images/shoulder_massage_female_1784194968180.jpg';
    default:
      return '/images/spa_interior_shelves_1784194922286.jpg';
  }
};

export const ServicesView: React.FC<ServicesViewProps> = ({ setActiveTab }) => {
  const { services: SERVICES } = useAppData();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Hammam-Inspired' | 'Therapeutic' | 'Traditional'>('All');
  const [selectedService, setSelectedService] = useState<MassageService | null>(null);

  const filteredServices = selectedFilter === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedFilter);

  const getServiceIcon = (id: string) => {
    switch(id) {
      case 'royal-hammam':
        return <Droplets className="w-5 h-5 text-brand-clay" />;
      case 'deep-clay':
        return <Flame className="w-5 h-5 text-brand-clay" />;
      case 'atlas-argan':
        return <Sparkles className="w-5 h-5 text-brand-clay" />;
      case 'berber-stones':
        return <Flame className="w-5 h-5 text-brand-gold animate-pulse" />;
      default:
        return <Compass className="w-5 h-5 text-brand-clay" />;
    }
  };

  return (
    <div id="services-view" className="space-y-16 py-8 md:py-12">
      {/* Page Title Header */}
      <section id="services-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-brand-clay font-bold uppercase text-[10px] tracking-[0.25em]">Specialty Offerings</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-dark tracking-tight font-semibold">
            Restorative Rituals & Therapies
          </h2>
          <p className="text-brand-dark/60 text-xs sm:text-sm font-sans leading-relaxed">
            All our treatments integrate premium organic botanicals, high-end thermal science, and customized neuromuscular techniques for physical rehabilitation. Click any card to inspect chemical-free ingredients and detailed benefits.
          </p>
        </div>

        {/* 1. Filter Toggles with smooth transitions */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
          {(['All', 'Hammam-Inspired', 'Therapeutic', 'Traditional'] as const).map((filter) => (
            <button
              id={`filter-btn-${filter}`}
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-brand-clay text-white shadow-md'
                  : 'bg-white hover:bg-[#EADCD2]/20 text-brand-dark/70 border border-brand-clay/15'
              }`}
            >
              {filter === 'All' ? 'All Rituals' : filter}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Services Cards Grid - Replicating Screen 2 Visual Layout */}
      <section id="services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                id={`service-card-${service.id}`}
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedService(service)}
                className="bg-white rounded-xl border border-brand-clay/10 overflow-hidden shadow-md hover:shadow-xl hover:border-brand-clay/35 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              >
                {/* Visual Thumbnail Frame */}
                <div className="w-full h-48 overflow-hidden relative border-b border-brand-clay/10">
                  <img
                    src={service.image_url || getServiceImage(service.id)}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 to-transparent pointer-events-none" />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 bg-brand-dark/65 backdrop-blur-xs text-white text-[8px] uppercase tracking-wider font-bold px-3 py-1 font-sans">
                    {service.category}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Card Top: Service Icon and Price Tag */}
                    <div className="flex justify-between items-start">
                      <div className="w-11 h-11 bg-[#EADCD2]/20 border border-brand-clay/15 flex items-center justify-center transition-all group-hover:scale-110 duration-300">
                        {getServiceIcon(service.id)}
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] uppercase tracking-wider font-bold text-brand-dark/40">Starting at</span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-brand-dark bg-[#EADCD2]/15 px-3 py-1 border border-brand-clay/10">
                          USD ${service.price}
                        </span>
                      </div>
                    </div>

                    {/* Service Name */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark tracking-tight leading-snug group-hover:text-brand-clay transition-colors">
                      {service.name}
                    </h3>

                    {/* Short description */}
                    <p className="text-xs text-brand-dark/70 leading-relaxed font-sans font-light line-clamp-3">
                      {service.description}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 text-xs text-brand-dark/50 font-sans pt-1">
                      <Clock3 className="w-3.5 h-3.5 text-brand-clay" />
                      <span>Treatment Session Duration: <strong className="font-semibold text-brand-dark">{service.duration} mins</strong></span>
                    </div>
                  </div>

                {/* Card Footer: Highlight List */}
                <div className="pt-5 border-t border-brand-clay/15 mt-4 space-y-3">
                  <span className="block text-[10px] uppercase font-bold text-brand-dark/50 tracking-wider">What is Included:</span>
                  <div className="space-y-1.5">
                    {service.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-brand-dark/70 leading-relaxed">
                        <div className="w-4 h-4 rounded-full bg-brand-olive/10 border border-brand-olive/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-brand-olive" />
                        </div>
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold pt-2 group-hover:translate-x-1 transition-transform">
                    Inspect Ingredients &amp; Book →
                  </span>
                </div>
              </div>
            </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. Detailed Service Modal - High fidelity interaction */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-xl border border-brand-clay/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-6 shadow-2xl relative"
            >
              
              {/* Close Button */}
              <button
                id="close-service-modal"
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/85 hover:bg-white text-brand-dark transition-smooth cursor-pointer z-10 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Hero Banner */}
              <div className="w-full h-48 sm:h-64 rounded-lg overflow-hidden border border-brand-clay/10 relative">
                <img
                  src={selectedService.image_url || getServiceImage(selectedService.id)}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent flex items-end p-6">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-brand-gold bg-brand-dark/65 px-2.5 py-1">
                    {selectedService.category} Regimen
                  </span>
                </div>
              </div>

              {/* Modal Header */}
              <div className="space-y-3 pr-8">
                <span className="text-[10px] font-bold text-brand-clay uppercase tracking-widest">
                  {selectedService.category} Regimen
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
                  {selectedService.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold text-brand-dark bg-[#EADCD2]/25 px-3 py-1 border border-brand-clay/10">
                    USD ${selectedService.price}
                  </span>
                  <span className="text-xs text-brand-dark/50">•</span>
                  <span className="text-xs font-semibold text-brand-clay">{selectedService.duration} Minutes Session</span>
                </div>
              </div>

              {/* Core Description */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/40">Treatment Methodology</span>
                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans font-light">
                  {selectedService.description}
                </p>
              </div>

              {/* Target Outcomes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#EADCD2]/10 p-5 rounded-lg border border-brand-clay/10">
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-clay">Organic Botanicals Injected</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedService.ingredients?.map((ing, i) => (
                      <span key={i} className="bg-white border border-brand-clay/15 text-brand-dark text-[10px] font-medium px-2.5 py-1">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-olive-dark">Ideal Clinical Candidate</span>
                  <p className="text-[11px] text-brand-dark/70 font-sans leading-relaxed font-light">
                    {selectedService.idealFor}
                  </p>
                </div>
              </div>

              {/* Benefits detail list */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/40">Physiological Advancements (What Is Included)</span>
                <div className="space-y-2">
                  {selectedService.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-brand-dark/70">
                      <div className="w-5 h-5 rounded-full bg-brand-olive/10 border border-brand-olive/20 flex items-center justify-center shrink-0 mt-0.5 text-brand-olive">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bottom */}
              <div className="pt-4 border-t border-brand-clay/15 flex items-center justify-end gap-3">
                <button
                  id="modal-cancel-btn"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 border border-brand-clay/15 text-brand-dark text-xs font-bold uppercase tracking-widest hover:bg-brand-sand transition-smooth cursor-pointer"
                >
                  Close Window
                </button>
                <button
                  id="modal-book-btn"
                  onClick={() => {
                    localStorage.setItem('preselectedServiceId', selectedService.id);
                    setSelectedService(null);
                    setActiveTab('booking');
                  }}
                  className="bg-brand-olive hover:bg-brand-olive-dark text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-smooth cursor-pointer shadow-md"
                >
                  Book Session Now
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
