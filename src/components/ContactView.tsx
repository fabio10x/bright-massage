import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Compass, CheckCircle2, Coffee, Clock3 } from 'lucide-react';
import { Inquiry } from '../types';

interface ContactViewProps {
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => void;
  inquiries: Inquiry[];
}

export const ContactView: React.FC<ContactViewProps> = ({ addInquiry, inquiries }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields (Name, Email, Subject, and Message)');
      return;
    }

    addInquiry({ name, email, phone, subject, message });
    setIsSubmitted(true);

    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div id="contact-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      
      {/* 1. Contact Form & Info Columns */}
      <section id="contact-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-xl border border-brand-clay/10 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-moroccan-pattern opacity-[0.03] pointer-events-none" />
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <span className="text-brand-clay font-bold uppercase text-[10px] tracking-[0.25em] block">GET IN TOUCH</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">Direct General Inquiries</h2>
                <p className="text-brand-dark/70 text-xs sm:text-sm font-sans font-light">
                  Have inquiries regarding group packages, private Riad reservations, or custom wedding spa days? Drop us a line. We reply within 12 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-dark uppercase">Your Name <span className="text-brand-clay">*</span></label>
                  <input
                    id="contact-name-input"
                    type="text"
                    placeholder="Michael Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-dark uppercase">Email Address <span className="text-brand-clay">*</span></label>
                  <input
                    id="contact-email-input"
                    type="email"
                    placeholder="michael@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-dark uppercase">Phone Number</label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    placeholder="+1 555-0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-dark uppercase">Message Subject <span className="text-brand-clay">*</span></label>
                  <input
                    id="contact-subject-input"
                    type="text"
                    placeholder="Couples Hammam Group Rates"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-dark uppercase">Your Message <span className="text-brand-clay">*</span></label>
                <textarea
                  id="contact-message-input"
                  rows={4}
                  placeholder="Detail your request here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all resize-none"
                  required
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full bg-brand-clay hover:bg-brand-clay-dark text-white text-center py-4 text-xs tracking-widest uppercase font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send Secure Message
              </button>
            </form>
          ) : (
            /* Contact success state */
            <div id="contact-success" className="text-center py-12 space-y-6 animate-fade-in relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-clay/15 border border-brand-clay/35 flex items-center justify-center text-brand-clay mx-auto">
                <Coffee className="w-8 h-8 text-brand-gold animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">TRANSMITTED SECURELY</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-brand-dark/70 max-w-md mx-auto leading-relaxed font-sans font-light">
                  We have received your general inquiry. Our guest relations team is reviewing details and will send a tailored response shortly.
                </p>
              </div>

              {/* Tea welcome invite */}
              <div className="max-w-md mx-auto bg-[#EADCD2]/20 p-5 rounded-md border border-brand-clay/15 text-left space-y-3 shadow-sm">
                <span className="font-serif font-bold text-brand-clay block text-sm">
                  The Hospitality Tea Ritual Invitation
                </span>
                <p className="text-xs text-brand-dark/70 leading-relaxed font-sans font-light">
                  In Morocco, welcoming visitors is a holy tradition. Should your request lead to a booking, we are proud to offer you a complimentary 20-minute tea-brewing workshop in our lounge, utilizing wild honeycombs, organic pine nuts, and gunpowder green tea.
                </p>
              </div>

              <button
                id="contact-reset-btn"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-bold text-brand-clay uppercase tracking-widest hover:underline cursor-pointer"
              >
                ← Send another Inquiry message
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Address and Social Blocks (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick Info block */}
          <div className="bg-[#EADCD2]/10 p-6 sm:p-8 rounded-xl border border-brand-clay/15 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-brand-dark">Contact Information</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="w-9 h-9 rounded-md bg-white border border-brand-clay/15 flex items-center justify-center text-brand-clay shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-brand-dark">Medina Sanctuary</strong>
                  <span className="text-brand-dark/65 font-sans font-light">12 Rue de la Bahia, Medina, Marrakech 40000, Morocco</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="w-9 h-9 rounded-md bg-white border border-brand-clay/15 flex items-center justify-center text-brand-clay shrink-0 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-brand-dark">Telephone Lines</strong>
                  <span className="text-brand-dark/65 font-mono font-light">0933203070</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="w-9 h-9 rounded-md bg-white border border-brand-clay/15 flex items-center justify-center text-brand-clay shrink-0 shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-brand-dark">Electronic Mail</strong>
                  <span className="text-brand-dark/65 font-mono font-light">relations@brightmassage.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="w-9 h-9 rounded-md bg-white border border-brand-clay/15 flex items-center justify-center text-brand-clay shrink-0 shadow-sm">
                  <Clock3 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-brand-dark">Operating Hours</strong>
                  <span className="text-brand-dark/65 font-sans font-light">Monday – Sunday</span>
                  <span className="text-[11px] text-brand-clay font-bold tracking-wider font-sans block mt-0.5">09:00 AM – 09:00 PM (GMT+1)</span>
                </div>
              </div>
            </div>

            {/* Social Connection */}
            <div className="pt-6 border-t border-brand-clay/15 space-y-3">
              <span className="block text-[10px] uppercase font-bold text-brand-dark/50 tracking-[0.2em]">Social Coordinates</span>
              <div className="flex items-center gap-3">
                <a
                  id="social-instagram"
                  href="#instagram"
                  className="w-10 h-10 rounded-md bg-white border border-brand-clay/15 hover:border-brand-clay hover:text-brand-clay text-brand-dark flex items-center justify-center transition-all shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  id="social-facebook"
                  href="#facebook"
                  className="w-10 h-10 rounded-md bg-white border border-brand-clay/15 hover:border-brand-clay hover:text-brand-clay text-brand-dark flex items-center justify-center transition-all shadow-sm"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  id="social-pinterest"
                  href="#pinterest"
                  className="w-10 h-10 rounded-md bg-white border border-brand-clay/15 hover:border-brand-clay hover:text-brand-clay text-brand-dark flex items-center justify-center transition-all text-xs font-bold font-serif shadow-sm"
                >
                  P
                </a>
              </div>
            </div>
          </div>

          {/* HIGH-FIDELITY INTERACTIVE SVG MAP */}
          <div className="bg-white p-6 rounded-xl border border-brand-clay/10 space-y-4 shadow-md">
            <div className="flex justify-between items-center">
              <h4 className="font-serif text-sm font-bold text-brand-dark">Medina Neighborhood Map</h4>
              <span className="text-[9px] uppercase font-bold tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                Interactive Map
              </span>
            </div>

            <div className="relative border border-brand-clay/15 rounded-lg overflow-hidden h-64 bg-[#F2ECE2] group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.12061099233!2d38.784557999999996!3d8.980603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cefc3ec86d%3A0x88ea3079b9b18367!2sAddis%20Ababa%20Bole%20International%20Airport!5e0!3m2!1sen!2set!4v1716382023530!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              {/* Floating overlay explaining instructions */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 p-2.5 rounded border border-brand-clay/10 text-[10px] font-sans flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-clay animate-pulse" />
                <span className="text-brand-dark/75">
                  We are located near the Addis Ababa Bole International Airport.
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Client-side Inquiry Logs (For transparency and verifying interaction) */}
      {inquiries.length > 0 && (
        <section id="inquiry-registry" className="bg-[#EADCD2]/10 p-6 sm:p-8 rounded-xl border border-brand-clay/15 space-y-4 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-brand-dark/40 tracking-[0.2em] block">YOUR SUBMITTED INQUIRIES (LOCAL CACHE)</span>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {inquiries.map((inq) => (
              <div key={inq.id} className="bg-white p-4 rounded-md border border-brand-clay/10 space-y-2 shadow-xs">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <strong className="text-brand-dark font-sans">{inq.name}</strong>
                    <span className="text-brand-dark/50 font-mono ml-2">({inq.email})</span>
                  </div>
                  <span className="text-[10px] text-brand-clay font-mono">{inq.createdAt.split('T')[0]}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-brand-gold uppercase">{inq.subject}</span>
                  <p className="text-xs text-brand-dark/70 leading-relaxed font-sans font-light">{inq.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
