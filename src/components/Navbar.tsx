import React, { useState } from 'react';
import { Sparkles, Menu, X, Phone, Compass } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'booking', label: 'Book Appointment' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-brand-sand-light/95 backdrop-blur-md border-b border-brand-clay/20 transition-smooth">
      {/* Upper Subtle Alert / Scent Bar */}
      <div className="bg-brand-olive text-brand-sand-light text-xs py-2 px-4 flex justify-between items-center tracking-wide font-medium">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Compass className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
          <span>Experience the Moroccan Hammam &amp; Restorative Oils Ritual</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px] text-brand-sand-light/80">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-brand-gold" /> 0933203070</span>
          <span>•</span>
          <span>Rue de la Bahia, Marrakech</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand Frame */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex flex-col focus:outline-none text-left cursor-pointer group"
          >
            <span className="text-xl sm:text-2xl font-serif tracking-tight text-brand-olive leading-tight transition-colors group-hover:text-brand-clay">
              Bright Massage <span className="text-brand-clay font-light">&amp;</span> Morocco
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold opacity-60">
              Authentic Maghreb Wellness
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`pb-1 font-sans text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-brand-clay border-b border-brand-clay' 
                      : 'text-brand-dark/70 hover:text-brand-olive border-b border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden sm:flex items-center">
            <button
              id="cta-book-now"
              onClick={() => handleNavClick('booking')}
              className="px-6 py-2.5 bg-brand-olive text-white text-xs uppercase tracking-widest font-bold hover:bg-brand-olive-dark transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              Book Session
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-brand-dark hover:text-brand-clay focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-nav-panel" className="lg:hidden bg-brand-sand-light border-b border-brand-sand-dark animate-fade-in">
          <div className="px-2 pt-2 pb-6 space-y-1.5 sm:px-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`mobile-nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-sans text-xs tracking-wider uppercase font-semibold ${
                    isActive 
                      ? 'bg-brand-clay/10 text-brand-clay border-l-4 border-brand-clay' 
                      : 'text-brand-dark/70 hover:bg-brand-sand-dark/30 hover:text-brand-dark'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 px-4">
              <button
                id="mobile-cta-book-now"
                onClick={() => handleNavClick('booking')}
                className="w-full bg-brand-olive text-white text-center py-3 rounded-none font-sans text-xs tracking-widest uppercase font-semibold shadow-md"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
