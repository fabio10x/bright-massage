import React, { useState } from 'react';
import { Calendar, Clock, User, Compass, CheckCircle2, Copy, Sparkles, MapPin, Mail, Phone, RefreshCw } from 'lucide-react';
import { useAppData } from '../hooks/useAppData';
import { Appointment } from '../types';

interface BookingViewProps {
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Promise<Appointment>;
}

export const BookingView: React.FC<BookingViewProps> = ({ addAppointment }) => {
  const { services: SERVICES, team: TEAM } = useAppData();

  // Booking Form States
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0]?.id || '');
  const [selectedTherapistId, setSelectedTherapistId] = useState('any');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  
  // Submission result state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastBooking, setLastBooking] = useState<Appointment | null>(null);
  const [copiedDirections, setCopiedDirections] = useState(false);

  // Available timeslots
  const timeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'];

  React.useEffect(() => {
    const preselected = localStorage.getItem('preselectedServiceId');
    if (preselected && SERVICES.find(s => s.id === preselected)) {
      setSelectedServiceId(preselected);
      localStorage.removeItem('preselectedServiceId');
    } else if (SERVICES.length > 0 && !selectedServiceId) {
      setSelectedServiceId(SERVICES[0].id);
    }
  }, [SERVICES, selectedServiceId]);

  // Handle Form Submit
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !selectedDate || !selectedTimeSlot) {
      alert('Please fill in all required fields (Name, Email, Phone, Date, and Time Slot)');
      return;
    }

    const service = SERVICES.find(s => s.id === selectedServiceId)!;
    let therapistName = 'First Available Specialist';
    if (selectedTherapistId !== 'any') {
      therapistName = TEAM.find(t => t.id === selectedTherapistId)?.name || '';
    }

    const bookingData = {
      clientName,
      clientEmail,
      clientPhone,
      serviceId: selectedServiceId,
      serviceName: service.name,
      date: selectedDate,
      time: selectedTimeSlot,
      therapistId: selectedTherapistId,
      therapistName,
      notes
    };

    const newBooking = await addAppointment(bookingData);
    setLastBooking(newBooking);
    setIsSubmitted(true);

    // Reset Form
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setSelectedDate('');
    setSelectedTimeSlot('');
    setNotes('');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('12 Rue de la Bahia, Medina, Marrakech 40000, Morocco');
    setCopiedDirections(true);
    setTimeout(() => setCopiedDirections(false), 2000);
  };

  // Prevent selecting dates in the past
  const getMinDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div id="booking-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Booking Form (7 cols on large screens) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-xl border border-brand-clay/10 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-moroccan-pattern opacity-[0.03] pointer-events-none" />
          
          {!isSubmitted ? (
            <form onSubmit={handleBookingSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <span className="text-brand-clay font-bold uppercase text-[10px] tracking-[0.25em] block">ONLINE SCHEDULING</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">Book Your Restorative Session</h2>
                <p className="text-brand-dark/70 text-xs sm:text-sm font-sans font-light">
                  Choose your treatment, pick an expert therapist, and select your preferred date. Your request is transmitted immediately.
                </p>
              </div>

              {/* Step 1: Select Treatment Service */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                  1. Select Treatment / Ritual <span className="text-brand-clay">*</span>
                </label>
                <div className="relative">
                  <select
                    id="booking-service-select"
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full bg-[#EADCD2]/10 border border-brand-clay/15 rounded-md px-4 py-3 text-xs sm:text-sm text-brand-dark focus:border-brand-clay focus:outline-none cursor-pointer appearance-none"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.duration} mins (USD ${s.price})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-dark/50">
                    ▼
                  </div>
                </div>
              </div>

              {/* Step 2: Select Specialist */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                  2. Preferred Specialist
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <button
                    id="therapist-any-btn"
                    type="button"
                    onClick={() => setSelectedTherapistId('any')}
                    className={`p-3 rounded-md border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      selectedTherapistId === 'any'
                        ? 'border-brand-clay bg-brand-clay/5 text-brand-clay font-bold'
                        : 'border-brand-clay/15 hover:border-brand-clay/30 bg-white text-brand-dark'
                    }`}
                  >
                    <span className="font-serif text-xs block">First Available</span>
                    <span className="text-[9px] opacity-70 mt-1 block leading-tight">Fastest Booking slot</span>
                  </button>

                  {TEAM.map((t) => (
                    <button
                      id={`therapist-btn-${t.id}`}
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTherapistId(t.id)}
                      className={`p-3 rounded-md border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        selectedTherapistId === t.id
                          ? 'border-brand-clay bg-brand-clay/5 text-brand-clay font-bold'
                          : 'border-brand-clay/15 hover:border-brand-clay/30 bg-white text-brand-dark'
                      }`}
                    >
                      <span className="font-serif text-xs block">{t.name.split(' ')[0]}</span>
                      <span className="text-[8.5px] opacity-75 mt-1 block leading-tight line-clamp-2">{t.specialty.split('&')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Select Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                    3. Select Date <span className="text-brand-clay">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="booking-date-input"
                      type="date"
                      min={getMinDateString()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#EADCD2]/10 border border-brand-clay/15 rounded-md px-4 py-3 text-xs text-brand-dark focus:border-brand-clay focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Time Slot Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                    4. Preferred Time Slot <span className="text-brand-clay">*</span>
                  </label>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1.5 border border-brand-clay/15 rounded-md bg-[#EADCD2]/10">
                      {timeSlots.map((slot) => (
                        <button
                          id={`time-slot-btn-${slot.replace(' ', '-')}`}
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-1 text-center rounded-sm text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-brand-olive text-white shadow-sm'
                              : 'bg-white text-brand-dark hover:bg-brand-sand border border-brand-clay/15'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 border border-dashed border-brand-clay/20 rounded-md text-center bg-[#EADCD2]/10 text-[11px] text-brand-dark/50 italic">
                      Please select a Date first to load slots
                    </div>
                  )}
                </div>
              </div>

              {/* Step 4: Contact details */}
              <div className="space-y-4 pt-4 border-t border-brand-clay/15">
                <span className="block text-xs font-bold text-brand-dark uppercase tracking-wider">5. Contact Information</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-dark uppercase">Full Name <span className="text-brand-clay">*</span></label>
                    <input
                      id="booking-client-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-dark uppercase">Email Address <span className="text-brand-clay">*</span></label>
                    <input
                      id="booking-client-email"
                      type="email"
                      placeholder="jane@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-dark uppercase">Mobile Phone <span className="text-brand-clay">*</span></label>
                    <input
                      id="booking-client-phone"
                      type="tel"
                      placeholder="+212 600-000000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-dark uppercase">Custom Requests</label>
                    <input
                      id="booking-client-notes"
                      type="text"
                      placeholder="E.g., Focus on lower back stiffness"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Trigger */}
              <div className="pt-4">
                <button
                  id="booking-submit-btn"
                  type="submit"
                  className="w-full bg-brand-clay hover:bg-brand-clay-dark text-white text-center py-4 text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer"
                >
                  Transmit Appointment Request
                </button>
              </div>
            </form>
          ) : (
            /* INTERACTIVE SUCCESS STATE */
            <div id="booking-success" className="text-center py-8 space-y-6 animate-fade-in relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-olive/10 border border-brand-olive/30 flex items-center justify-center text-brand-olive mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">REQUEST RECEIVED</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">Appointment Transmitted!</h3>
                <p className="text-xs sm:text-sm text-brand-dark/70 max-w-md mx-auto leading-relaxed font-sans font-light">
                  Thank you, <strong className="font-bold text-brand-dark">{lastBooking?.clientName}</strong>. Your luxury Moroccan session is logged into our database with status: <span className="text-brand-olive font-bold uppercase tracking-wider bg-brand-olive/10 px-2 py-0.5 rounded">Pending Review</span>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#EADCD2]/10 border border-brand-clay/15 p-6 rounded-lg max-w-md mx-auto text-left space-y-4 shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b border-brand-clay/15">
                  <span className="text-[10px] font-mono font-semibold text-brand-dark/40 uppercase">Receipt Code: {lastBooking?.id}</span>
                  <span className="text-[10px] font-mono font-bold text-brand-clay">{lastBooking?.createdAt.split('T')[0]}</span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-brand-dark/45">Treatment Confirmed</span>
                    <strong className="font-serif text-brand-dark text-base">{lastBooking?.serviceName}</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-brand-dark/45">Date &amp; Slot</span>
                      <strong className="font-sans text-brand-dark text-xs">{lastBooking?.date} @ {lastBooking?.time}</strong>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-brand-dark/45">Selected Specialist</span>
                      <strong className="font-sans text-brand-dark text-xs">{lastBooking?.therapistName}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-clay/15 flex justify-between items-center text-xs">
                  <span className="font-medium text-brand-dark/60">Estimated Total:</span>
                  <strong className="font-mono text-brand-dark text-base font-bold">USD ${SERVICES.find(s=>s.id === lastBooking?.serviceId)?.price}</strong>
                </div>
              </div>

              {/* Hospitality notes */}
              <div className="max-w-md mx-auto bg-[#EADCD2]/25 p-4 rounded-md border border-brand-clay/15 text-left text-xs leading-relaxed space-y-2">
                <span className="font-serif font-bold text-brand-clay flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> What to expect upon arrival
                </span>
                <p className="text-brand-dark/70 font-sans font-light">
                  Please arrive 15 minutes before your scheduled slot. We will greet you with our signature organic Moroccan mint tea welcome ritual. Personal lockers, soft cotton robes, and spa slippers are provided.
                </p>
              </div>

              {/* Reset trigger */}
              <button
                id="book-another-btn"
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-clay uppercase tracking-widest hover:text-brand-clay-dark cursor-pointer pt-4"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Book another Treatment session
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Contact info & Interactive Neighborhood SVG Map */}
        <div className="lg:col-span-5 space-y-8">
          {/* Contact Details Card */}
          <div className="bg-[#EADCD2]/10 p-6 sm:p-8 rounded-xl border border-brand-clay/15 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-brand-dark">Our Marrakech Sanctuary</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <MapPin className="w-5 h-5 text-brand-clay shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Physical Address</strong>
                  <span className="text-brand-dark/65 font-sans font-light">12 Rue de la Bahia, Medina, Marrakech 40000, Morocco</span>
                  <button
                    id="copy-address-btn"
                    onClick={copyAddress}
                    className="mt-1.5 text-[10px] text-brand-clay font-bold uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> {copiedDirections ? 'Address Copied!' : 'Copy Address Directions'}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <Phone className="w-5 h-5 text-brand-clay shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Direct Scent Line</strong>
                  <span className="text-brand-dark/65 font-mono">0933203070</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <Mail className="w-5 h-5 text-brand-clay shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-dark">Guest Relations Email</strong>
                  <span className="text-brand-dark/65 font-mono">relations@brightmassage.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-clay/15 text-xs text-brand-dark/50 font-light">
              <span>* Private parking and secure locker rooms are available for all guests. Secure reservations.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
