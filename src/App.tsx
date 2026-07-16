import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { GalleryView } from './components/GalleryView';
import { BookingView } from './components/BookingView';
import { ContactView } from './components/ContactView';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Appointment, BookingStatus, Inquiry } from './types';
import { supabase } from './lib/supabase';


export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const fetchData = async () => {
    const { data: appointmentsData } = await supabase.from('bright_massage_appointments').select('*').order('created_at', { ascending: false });
    if (appointmentsData) {
      setAppointments(appointmentsData.map((a: any) => ({
        ...a,
        clientName: a.client_name,
        clientEmail: a.client_email,
        clientPhone: a.client_phone,
        serviceId: a.service_id,
        serviceName: a.service_name,
        therapistId: a.therapist_id,
        therapistName: a.therapist_name,
        createdAt: a.created_at
      })));
    }

    const { data: inquiriesData } = await supabase.from('bright_massage_inquiries').select('*').order('created_at', { ascending: false });
    if (inquiriesData) {
      setInquiries(inquiriesData.map((i: any) => ({
        ...i,
        createdAt: i.created_at
      })));
    }
  };

  // 1. Fetch data & Real-time Subscription
  useEffect(() => {
    fetchData();

    // Subscribe to real-time changes
    const appointmentsSub = supabase
      .channel('public:bright_massage_appointments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bright_massage_appointments' }, fetchData)
      .subscribe();

    const inquiriesSub = supabase
      .channel('public:bright_massage_inquiries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bright_massage_inquiries' }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(appointmentsSub);
      supabase.removeChannel(inquiriesSub);
    };
  }, []);

  // Listen to auth state changes to re-fetch when admin logs in (resolving RLS visibility issues)
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchData();
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 2. Transmit & Store Appointment Action
  const addAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const id = `BM-${Math.floor(1000 + Math.random() * 9000)}`;
    const status: BookingStatus = 'Pending';
    
    // We only need to insert it, real-time subscription will update the list
    const { error } = await supabase.from('bright_massage_appointments').insert({
      id,
      status,
      client_name: appointmentData.clientName,
      client_email: appointmentData.clientEmail,
      client_phone: appointmentData.clientPhone,
      service_id: appointmentData.serviceId,
      service_name: appointmentData.serviceName,
      date: appointmentData.date,
      time: appointmentData.time,
      therapist_id: appointmentData.therapistId === 'any' ? null : appointmentData.therapistId,
      therapist_name: appointmentData.therapistName,
      notes: appointmentData.notes
    });
    
    if (error) {
      console.error('Error inserting appointment:', error);
      alert(`There was a problem communicating with our database: ${error.message}`);
      return null as any;
    }
    
    const newAppointment = { ...appointmentData, id, status, createdAt: new Date().toISOString() } as Appointment;
    
    // Optimistic UI update in case real-time fails or is delayed
    setAppointments(prev => [newAppointment, ...prev]);

    return newAppointment;
  };

  // 3. Update Appointment Status Admin Action
  const updateAppointmentStatus = async (id: string, status: BookingStatus) => {
    // Optimistic UI update
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    await supabase.from('bright_massage_appointments').update({ status }).eq('id', id);
  };

  // 4. Transmit & Store Inquiry Action
  const addInquiry = async (inquiryData: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const id = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    
    await supabase.from('bright_massage_inquiries').insert({
      id,
      name: inquiryData.name,
      email: inquiryData.email,
      phone: inquiryData.phone,
      subject: inquiryData.subject,
      message: inquiryData.message
    });
  };

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Render Page Content conditionally based on active Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutView />;
      case 'services':
        return <ServicesView setActiveTab={setActiveTab} />;
      case 'gallery':
        return <GalleryView />;
      case 'booking':
        return <BookingView addAppointment={addAppointment} />;
      case 'contact':
        return <ContactView addInquiry={addInquiry} inquiries={inquiries} />;
      case 'admin':
        return (
          <AdminDashboard 
            appointments={appointments} 
            updateStatus={updateAppointmentStatus} 
            setActiveTab={setActiveTab}
          />
        );
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-sand flex flex-col justify-between selection:bg-brand-clay/20 selection:text-brand-clay-dark relative overflow-hidden">
      {/* Drifting Moroccan geometric pattern overlay */}
      <div className="absolute inset-0 bg-moroccan-pattern animate-pattern-slow opacity-25 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Body Container with transition effects */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
