import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Droplets, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAppData } from '../hooks/useAppData';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const { services: SERVICES, reviews: REVIEWS } = useAppData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredServices = SERVICES.slice(0, 3); // Royal Hammam, Deep Clay, Atlas Argan

  if (SERVICES.length === 0 || REVIEWS.length === 0) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredServices.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredServices.length) % featuredServices.length);
  };

  return (
    <div id="home-view" className="space-y-20 py-8 md:py-16">
      {/* 1. Hero Section - Styled exactly like the Editorial Aesthetic spec with Framer Motion */}
      <section id="hero-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          id="hero-outer-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/60 p-8 md:p-14 rounded-2xl border border-brand-clay/10 shadow-lg relative overflow-hidden"
        >
          {/* Animated drifting geometric pattern background */}
          <div className="absolute inset-0 bg-moroccan-pattern animate-pattern-slow opacity-30 pointer-events-none" />
          
          {/* Left Text Column (7 cols on large screen) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8 relative z-10"
          >
            <div className="space-y-3">
              <span className="text-brand-clay font-serif italic text-lg sm:text-xl block">Ahlan wa Sahlan — Welcome</span>
              
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-brand-olive tracking-tight leading-[0.95] font-light">
                The Soul of <br />
                Morocco in <br />
                <span className="italic text-brand-clay font-normal">Every Touch.</span>
              </h1>
            </div>

            <p className="text-brand-dark/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-sans font-light">
              Experience the warmth of Marrakech in the heart of the city. Our traditional Hammam-inspired therapies combine ancient botanical wisdom with modern technique to transport you to the Maghreb.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-cta-book"
                onClick={() => setActiveTab('booking')}
                className="px-6 py-3 bg-brand-olive text-white text-xs uppercase tracking-widest font-bold hover:bg-brand-olive-dark transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                Book Session <ArrowRight className="w-4 h-4 text-brand-gold" />
              </button>
              <button
                id="hero-cta-services"
                onClick={() => setActiveTab('services')}
                className="px-6 py-3 bg-white hover:bg-brand-sand-dark/20 border border-brand-sand-dark text-brand-dark text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                Explore Treatments
              </button>
            </div>

            {/* Hero Stats Panel */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-brand-clay/15 max-w-md">
              <div>
                <span className="block font-serif text-2xl md:text-3xl font-bold text-brand-clay leading-none">98.7%</span>
                <span className="block text-[10px] uppercase font-semibold text-brand-dark/50 tracking-wider mt-1">Client Trust</span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl font-bold text-brand-clay leading-none">12k+</span>
                <span className="block text-[10px] uppercase font-semibold text-brand-dark/50 tracking-wider mt-1">Serene Sessions</span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl font-bold text-brand-clay leading-none">15+</span>
                <span className="block text-[10px] uppercase font-semibold text-brand-dark/50 tracking-wider mt-1">Hammam Masters</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image Placeholder Column with breathing pulse */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full flex justify-center py-6"
          >
            <div className="w-full max-w-[340px] aspect-[4/5] bg-white shadow-2xl relative p-3 border border-brand-clay/10 animate-subtle-pulse group">
              <div className="w-full h-full bg-[#EADCD2]/30 flex flex-col justify-center items-center text-center border border-brand-clay/10 relative overflow-hidden">
                <img 
                  src="/images/spa_interior_shelves_1784194922286.jpg" 
                  alt="Moroccan Wellness Spa Interior" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-dark/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white text-left z-10">
                  <h4 className="font-serif text-base font-semibold">Sensory Domain</h4>
                  <p className="text-[10px] text-white/95 leading-relaxed mt-2 font-mono italic">
                    "Warm candlelight, Moroccan mosaic tiles, Argan oil decanters, and soft organic linen."
                  </p>
                </div>
              </div>
              
              {/* Featured Ritual Badge matching the specification */}
              <div className="absolute -bottom-6 -left-6 bg-brand-olive text-white p-5 shadow-xl w-52 border border-brand-olive-light/10 z-20">
                <p className="text-[9px] uppercase tracking-[0.2em] mb-1 opacity-80 font-semibold font-sans">Featured Ritual</p>
                <p className="text-base font-serif font-medium text-brand-gold-light leading-tight">Royal Hammam Glow</p>
                <span className="block text-[10px] text-brand-sand-light/60 mt-1 font-sans">Therapist: Amira Belghazi</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Interactive Highlights Carousel / Slideshow */}
      <motion.section 
        id="services-carousel" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="text-brand-clay font-bold uppercase text-[11px] tracking-[0.25em]">Our Offerings</div>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark tracking-tight font-semibold">
            Signature Sensory Journeys
          </h2>
          <p className="text-brand-dark/60 text-xs sm:text-sm font-sans leading-relaxed">
            Click through our most coveted therapeutic treatments, balancing Moroccan bathing heritage with precision body manipulation.
          </p>
        </div>

        {/* Carousel Outer Frame */}
        <div className="relative bg-[#EADCD2]/10 p-6 md:p-12 rounded-xl border border-brand-clay/15 max-w-5xl mx-auto shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-moroccan-pattern animate-pattern-slow opacity-[0.05] pointer-events-none" />
          
          {/* Active Service Card Block with transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10"
            >
              {/* Slide Visual Placeholder (5 cols) */}
              <div className="md:col-span-5 h-[280px] md:h-[350px] bg-white rounded-none overflow-hidden border border-brand-clay/15 relative shadow-md p-3 group">
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={
                      currentSlide === 0 
                        ? "/images/hammam_steam_room_1784194541253.jpg"
                        : currentSlide === 1
                        ? "/images/massage_room_starry_1784194552089.jpg"
                        : "/images/glistening_massage_oil_1784194564535.jpg"
                    }
                    alt={featuredServices[currentSlide].name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Overlay for descriptive guide */}
                  <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white text-left">
                    <span className="text-[8px] uppercase tracking-wider font-bold text-brand-gold">Photography Concept</span>
                    <p className="text-[9px] leading-relaxed font-mono italic mt-1 text-white/95">
                      {currentSlide === 0 
                        ? '"Steaming black eucalyptus soap bowl, exfoliating kessa scrub glove, and smooth jade bowls of fresh clay."'
                        : currentSlide === 1
                        ? '"Clay bowls of red Atlas mineral soil painted slowly onto muscles, with basalt stones heating on dark embers."'
                        : '"Golden oil cascading off a pristine glass vial, surrounding Neroli citrus slices and rose petals."'}
                    </p>
                  </div>
                </div>
                
                <div className="absolute top-6 left-6 bg-brand-olive text-white text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 font-sans z-10">
                  {featuredServices[currentSlide].category}
                </div>
              </div>

              {/* Slide Text Content (7 cols) */}
              <div className="md:col-span-7 space-y-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-brand-dark font-medium leading-tight">
                      {featuredServices[currentSlide].name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-brand-dark/60">
                      <span className="font-semibold text-brand-clay">{featuredServices[currentSlide].duration} mins</span>
                      <span>•</span>
                      <span className="font-mono bg-[#EADCD2]/40 px-2.5 py-0.5 text-[11px] font-semibold text-brand-dark border border-brand-clay/10">USD ${featuredServices[currentSlide].price}</span>
                    </div>
                  </div>
                </div>

                <p className="text-brand-dark/80 text-sm leading-relaxed font-sans font-light">
                  {featuredServices[currentSlide].description}
                </p>

                {/* Benefits Snippet */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider">Key Physical Benefits</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {featuredServices[currentSlide].benefits.slice(0, 4).map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-brand-dark/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    id={`carousel-book-btn-${featuredServices[currentSlide].id}`}
                    onClick={() => setActiveTab('booking')}
                    className="bg-brand-clay hover:bg-brand-clay-dark text-white px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer shadow-md hover:-translate-y-0.5"
                  >
                    Book This Treatment
                  </button>
                  <button
                    id={`carousel-all-btn`}
                    onClick={() => setActiveTab('services')}
                    className="text-brand-dark/80 hover:text-brand-clay font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-1 cursor-pointer"
                  >
                    View All Services <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Arrow Navigation Controls */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-clay/20 relative z-10">
            {/* Dots indicator */}
            <div className="flex gap-2">
              {featuredServices.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 transition-smooth ${
                    currentSlide === idx ? 'bg-brand-clay w-6' : 'bg-[#EADCD2] hover:bg-brand-clay/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next / Prev buttons */}
            <div className="flex gap-2">
              <button
                id="carousel-prev"
                onClick={prevSlide}
                className="w-10 h-10 border border-brand-clay/15 bg-white hover:bg-brand-sand hover:text-brand-clay flex items-center justify-center text-brand-dark transition-smooth cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="carousel-next"
                onClick={nextSlide}
                className="w-10 h-10 border border-brand-clay/15 bg-white hover:bg-brand-sand hover:text-brand-clay flex items-center justify-center text-brand-dark transition-smooth cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Patient Trust & Google Map Reviews - Styled exactly like Reference Screen 5 */}
      <motion.section 
        id="testimonials-section" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-[#FAF8F5] p-8 md:p-14 rounded-[2.5rem] border border-brand-sand-dark/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-moroccan-pattern animate-pattern-slow opacity-15 pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-olive text-[10px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
              Verified Google Standing
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark tracking-tight font-semibold">
              Guest Trust & Verified Reviews
            </h2>
            <p className="text-brand-dark/60 text-xs sm:text-sm font-sans leading-relaxed">
              We are deeply committed to exceptional structural bodywork and absolute guest relaxation. Here is our official standing on Google Maps from actual guests in Marrakech.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* Left side: Rating Badge card (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-brand-sand-dark/60 shadow-sm space-y-6"
            >
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-dark/50 tracking-wider">Google Maps Profile</span>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-brand-dark">Bright Massage</h4>
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> VERIFIED SANCTUARY
                  </span>
                </div>
                <span className="block text-xs text-brand-dark/50 font-sans">Spa & Wellness • Rue de la Bahia, Marrakech</span>
              </div>

              {/* Big 5.0 Rating Circle */}
              <div className="flex items-center gap-4 py-4 border-y border-brand-sand-dark/40">
                <div className="w-20 h-20 rounded-full bg-brand-sand flex flex-col justify-center items-center border border-brand-sand-dark">
                  <span className="font-serif text-3xl font-bold text-brand-dark leading-none">5.0</span>
                  <span className="text-[9px] uppercase font-semibold text-brand-clay tracking-wider mt-1">Excellent</span>
                </div>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="block text-xs text-brand-dark/70 font-semibold mt-1">Based on 284 Google Reviews</span>
                  <span className="text-[10px] text-brand-dark/40 block mt-0.5">100% Client Satisfaction score</span>
                </div>
              </div>

              <p className="text-xs text-brand-dark/60 leading-relaxed font-sans italic">
                "Our massage therapy operates with strict compliance to physical hygiene, authentic Moroccan bath rituals, and pure oils certified by state organic cooperatives."
              </p>

              <button
                id="book-via-testimonials"
                onClick={() => setActiveTab('booking')}
                className="w-full bg-brand-olive hover:bg-brand-olive-dark text-brand-sand-light text-center py-3 rounded-xl font-sans text-xs tracking-widest uppercase font-bold transition-smooth shadow-sm cursor-pointer"
              >
                Book Your Wellness Session
              </button>
            </motion.div>

            {/* Right side: List of active verified reviews (7 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-[10px] uppercase font-bold text-brand-dark/50 tracking-wider block">Verified Guest Experiences</span>
              
              <div className="space-y-4">
                {REVIEWS.map((review) => (
                  <div key={review.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-brand-sand-dark/60 shadow-xs space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {/* Custom initials avatar */}
                        <div className={`w-10 h-10 rounded-full ${review.avatarColor} text-brand-sand-light flex items-center justify-center font-bold text-xs shadow-sm`}>
                          {review.clientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-brand-dark leading-none flex items-center gap-1.5">
                            {review.clientName}
                            <span className="bg-brand-sand-dark text-brand-dark/60 text-[8px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded">
                              {review.role}
                            </span>
                          </h5>
                          <span className="text-[10px] text-brand-dark/40 block mt-1">{review.date}</span>
                        </div>
                      </div>
                      
                      {/* Rating stars */}
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                        ))}
                      </div>
                    </div>

                    <p className="text-brand-dark/70 text-xs sm:text-sm leading-relaxed font-sans font-light">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
