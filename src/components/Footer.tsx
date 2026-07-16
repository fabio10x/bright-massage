import React from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-brand-dark text-brand-sand border-t border-brand-clay/15 mt-16">
      
      {/* Brand & Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Main Slogan & Eco-trust (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <button 
              id="footer-logo-btn"
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 focus:outline-none text-left cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-md bg-brand-clay flex items-center justify-center text-brand-sand-light shadow-md transition-all group-hover:scale-105 duration-300">
                <Sparkles className="w-4.5 h-4.5 text-brand-gold" />
              </div>
              <div>
                <span className="block font-serif text-base font-bold tracking-wider text-brand-sand leading-none">
                  BRIGHT MASSAGE
                </span>
                <span className="block font-sans text-[9px] uppercase tracking-[0.35em] text-brand-gold font-bold leading-none mt-1">
                  and Morocco
                </span>
              </div>
            </button>

            <p className="text-xs text-brand-sand/75 leading-relaxed font-sans font-light max-w-sm">
              We are a premier Moroccan-inspired massage sanctuary dedicated to organic cellular regeneration. Combining ancestral Hammam treatments with myofascial release, we help guests re-discover profound physical harmony.
            </p>

            {/* Direct Trade Cooperative trust */}
            <div className="flex items-start gap-2.5 bg-white/5 p-4 rounded-md border border-white/10 max-w-sm">
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <span className="text-[10.5px] text-brand-sand/80 leading-relaxed font-sans font-light">
                <strong>Ethical Sourcing Guarantee:</strong> 100% of our Argan oils are direct-traded, cold-pressed by female-led agricultural collectives in southwest Morocco.
              </span>
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-xs font-bold tracking-widest text-brand-gold uppercase">Ritual Domains</h4>
            <div className="flex flex-col gap-2.5 text-xs font-sans">
              <button onClick={() => handleNav('home')} className="text-left text-brand-sand/70 hover:text-brand-gold hover:underline underline-offset-4 cursor-pointer transition-all">Home Experience</button>
              <button onClick={() => handleNav('about')} className="text-left text-brand-sand/70 hover:text-brand-gold hover:underline underline-offset-4 cursor-pointer transition-all">The Founders &amp; Team</button>
              <button onClick={() => handleNav('services')} className="text-left text-brand-sand/70 hover:text-brand-gold hover:underline underline-offset-4 cursor-pointer transition-all">Specialty Treatments</button>
              <button onClick={() => handleNav('gallery')} className="text-left text-brand-sand/70 hover:text-brand-gold hover:underline underline-offset-4 cursor-pointer transition-all">Visual Gallery</button>
            </div>
          </div>

          {/* Booking & Admin Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-xs font-bold tracking-widest text-brand-gold uppercase">Secure Scheduling</h4>
            <div className="flex flex-col gap-2.5 text-xs font-sans">
              <button onClick={() => handleNav('booking')} className="text-left text-brand-sand/70 hover:text-brand-gold hover:underline underline-offset-4 cursor-pointer transition-all font-medium text-brand-sand">Book Online Appointment</button>
              <button onClick={() => handleNav('contact')} className="text-left text-brand-sand/70 hover:text-brand-gold hover:underline underline-offset-4 cursor-pointer transition-all">General Inquiry Form</button>
            </div>

            <div className="pt-4 space-y-1">
              <span className="block text-[10px] uppercase font-bold text-brand-sand/45 tracking-[0.2em]">Direct Reservation Hotlines</span>
              <span className="block text-xs font-mono text-brand-gold font-bold">0933203070</span>
              <div className="pt-4 mt-2">
                <button onClick={() => handleNav('admin')} className="text-[10px] text-brand-sand/20 hover:text-brand-gold/80 transition-colors cursor-pointer font-sans">
                  Admin Login
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-brand-sand/50 font-sans font-light">
          <span>
            © {currentYear} Bright Massage and Morocco. All ancestral rights reserved.
          </span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-brand-gold" /> Rue de la Bahia, Medina, Marrakech
            </span>
            <span>•</span>
            <span>Sanctuary Registry No. 2840-011</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
