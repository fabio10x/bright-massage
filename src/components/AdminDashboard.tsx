import React, { useState } from 'react';
import { Search, Check, X, Shield, Calendar, Clock, Phone, Mail, FileText, CheckCircle, RefreshCw, LogIn, LogOut, Edit2, Trash2 } from 'lucide-react';
import { Appointment, BookingStatus } from '../types';
import { useAppData } from '../hooks/useAppData';
import { supabase } from '../lib/supabase';
import { ServicesAdminPanel } from './ServicesAdminPanel';

interface AdminDashboardProps {
  appointments: Appointment[];
  updateStatus: (id: string, status: BookingStatus) => void;
  resetAll: () => void;
  setActiveTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  appointments,
  updateStatus,
  setActiveTab
}) => {
  const { services: SERVICES } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'ALL'>('ALL');
  const [activeAdminTab, setActiveAdminTab] = useState<'appointments' | 'services'>('appointments');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check current session on mount
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAdminLoggedIn(true);
        setAdminEmail(session.user.email || '');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAdminLoggedIn(true);
        setAdminEmail(session.user.email || '');
      } else {
        setIsAdminLoggedIn(false);
        setAdminEmail('');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (error) {
      setLoginError(error.message);
    } else {
      setIsAdminLoggedIn(true);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleEdit = async (appointment: Appointment) => {
    const newDate = window.prompt("Edit Date (e.g. 2026-10-15):", appointment.date);
    if (newDate === null) return;
    const newTime = window.prompt("Edit Time Slot (e.g. 10:30 AM):", appointment.time);
    if (newTime === null) return;

    const { error } = await supabase
      .from('bright_massage_appointments')
      .update({ date: newDate, time: newTime })
      .eq('id', appointment.id);

    if (error) alert("Error updating booking: " + error.message);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to completely delete this appointment?")) {
      const { error } = await supabase
        .from('bright_massage_appointments')
        .delete()
        .eq('id', id);

      if (error) alert("Error deleting booking: " + error.message);
    }
  };

  // Metrics counts
  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const doneCount = appointments.filter(a => a.status === 'Done').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;

  // Filtered Appointments
  const filteredAppointments = appointments.filter((appointment) => {
    // 1. Status Filter
    if (statusFilter !== 'ALL' && appointment.status !== statusFilter) {
      return false;
    }

    // 2. Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchesName = appointment.clientName.toLowerCase().includes(query);
      const matchesPhone = appointment.clientPhone.includes(query);
      const matchesId = appointment.id.toLowerCase().includes(query);
      const matchesService = appointment.serviceName.toLowerCase().includes(query);
      return matchesName || matchesPhone || matchesId || matchesService;
    }

    return true;
  });

  return (
    <div id="admin-dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {!isAdminLoggedIn ? (
        /* Login frame */
        <div id="admin-login-card" className="max-w-md mx-auto bg-white p-8 rounded-xl border border-brand-clay/15 shadow-lg space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-moroccan-pattern opacity-[0.03] pointer-events-none" />

          <div className="text-center space-y-2 relative z-10">
            <Shield className="w-12 h-12 text-brand-clay mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-brand-dark">Administration Access</h3>
            <p className="text-xs text-brand-dark/65 font-sans font-light">
              Enter credentials to access the appointments scheduler and guest logs.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {loginError && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-md border border-red-100 font-sans">
                {loginError}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-dark uppercase">Admin Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-dark uppercase">Security Code / Password</label>
              <input
                type="password"
                placeholder="Enter password..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-white border border-brand-clay/15 rounded-md px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                required
              />
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-olive text-white text-center py-3.5 rounded-md font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="w-full text-center text-[10px] text-brand-dark/50 hover:text-brand-clay uppercase tracking-widest font-bold pt-2 transition-colors cursor-pointer"
            >
              ← Return to Sanctuary
            </button>
          </form>
        </div>
      ) : (
        /* ACTIVE ADMIN DASHBOARD - Styled exactly like Screen 6 */
        <div id="admin-active-dashboard" className="space-y-8 animate-fade-in">

          {/* Header Row - Matches Screen 6 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#EADCD2]/10 p-6 rounded-xl border border-brand-clay/15 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-moroccan-pattern opacity-[0.02] pointer-events-none" />

            <div className="space-y-1 relative z-10">
              <span className="text-brand-clay font-bold uppercase text-[10px] tracking-[0.25em] block">REAL-TIME ADMINISTRATION</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">Admin Dashboard</h2>
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveAdminTab('appointments')}
                  className={`text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors ${activeAdminTab === 'appointments' ? 'text-brand-clay border-b-2 border-brand-clay pb-0.5' : 'text-brand-dark/50 hover:text-brand-dark'
                    }`}
                >
                  Appointments Log
                </button>
                <button
                  onClick={() => setActiveAdminTab('services')}
                  className={`text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors ${activeAdminTab === 'services' ? 'text-brand-clay border-b-2 border-brand-clay pb-0.5' : 'text-brand-dark/50 hover:text-brand-dark'
                    }`}
                >
                  Services Registry
                </button>
              </div>
            </div>

            <div className="flex gap-2 relative z-10">
              <button
                id="admin-signout-btn"
                onClick={handleSignOut}
                className="bg-brand-clay hover:bg-brand-clay-dark text-white px-4 py-2 rounded-md text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          </div>

          {activeAdminTab === 'appointments' ? (
            <>
              {/* Metric Counts Row - Styled like Screen 6 */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                {/* TOTAL */}
                <div className="bg-white p-5 rounded-xl border border-brand-clay/10 shadow-md relative">
                  <span className="block text-[10px] uppercase font-bold text-brand-dark/45 tracking-wider">TOTAL</span>
                  <span className="block font-serif text-3xl font-bold text-brand-dark mt-2">{totalCount}</span>
                  <span className="absolute bottom-4 right-4 text-xs font-mono text-brand-dark/30">#ALL</span>
                </div>

                {/* PENDING */}
                <div className="bg-white p-5 rounded-xl border border-brand-clay/10 shadow-md relative border-l-4 border-l-brand-gold">
                  <span className="block text-[10px] uppercase font-bold text-brand-gold tracking-wider">PENDING</span>
                  <span className="block font-serif text-3xl font-bold text-brand-dark mt-2">{pendingCount}</span>
                  <span className="absolute bottom-4 right-4 text-xs font-mono text-brand-gold/30">#REQ</span>
                </div>

                {/* CONFIRMED */}
                <div className="bg-white p-5 rounded-xl border border-brand-clay/10 shadow-md relative border-l-4 border-l-brand-olive">
                  <span className="block text-[10px] uppercase font-bold text-brand-olive tracking-wider">CONFIRMED</span>
                  <span className="block font-serif text-3xl font-bold text-brand-dark mt-2">{confirmedCount}</span>
                  <span className="absolute bottom-4 right-4 text-xs font-mono text-brand-olive/30">#OK</span>
                </div>

                {/* DONE */}
                <div className="bg-white p-5 rounded-xl border border-brand-clay/10 shadow-md relative border-l-4 border-l-emerald-600">
                  <span className="block text-[10px] uppercase font-bold text-emerald-600 tracking-wider">DONE</span>
                  <span className="block font-serif text-3xl font-bold text-brand-dark mt-2">{doneCount}</span>
                  <span className="absolute bottom-4 right-4 text-xs font-mono text-emerald-600/30">#FIN</span>
                </div>

                {/* CANCELLED */}
                <div className="bg-white p-5 rounded-xl border border-brand-clay/10 shadow-md relative border-l-4 border-l-red-500">
                  <span className="block text-[10px] uppercase font-bold text-red-500 tracking-wider">CANCELLED</span>
                  <span className="block font-serif text-3xl font-bold text-brand-dark mt-2">{cancelledCount}</span>
                  <span className="absolute bottom-4 right-4 text-xs font-mono text-red-500/30">#DEL</span>
                </div>

              </div>

              {/* Search, Filter Actions Panel - Matches Screen 6 */}
              <div className="bg-white p-6 rounded-xl border border-brand-clay/10 shadow-lg space-y-6">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">

                  {/* Search input (8 cols on lg) */}
                  <div className="lg:col-span-6 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-dark/40">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      id="admin-search-input"
                      type="text"
                      placeholder="Search by guest name, booking ID, or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-brand-clay/15 rounded-md pl-10 pr-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                    />
                  </div>

                  {/* Status filtering tabs (6 cols on lg) */}
                  <div className="lg:col-span-6 flex flex-wrap gap-1 justify-start lg:justify-end">
                    {(['ALL', 'Pending', 'Confirmed', 'Done', 'Cancelled'] as const).map((status) => (
                      <button
                        id={`admin-filter-tab-${status}`}
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${statusFilter === status
                            ? 'bg-brand-dark text-white shadow-sm'
                            : 'bg-white hover:bg-[#EADCD2]/20 text-brand-dark/70 border border-brand-clay/15'
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                </div>

                {/* Bookings Table Frame */}
                <div className="overflow-x-auto border border-brand-clay/10 rounded-xl bg-white shadow-sm">
                  {filteredAppointments.length > 0 ? (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#EADCD2]/15 border-b border-brand-clay/15 text-brand-dark/50 font-bold uppercase tracking-wider text-[9px]">
                          <th className="p-4">Guest Details &amp; ID</th>
                          <th className="p-4">Selected Treatment</th>
                          <th className="p-4">Schedule Slot</th>
                          <th className="p-4">Therapist Specialist</th>
                          <th className="p-4">Live Status</th>
                          <th className="p-4 text-right">Administrative Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-clay/10">
                        {filteredAppointments.map((appointment) => (
                          <tr
                            id={`admin-row-${appointment.id}`}
                            key={appointment.id}
                            className="hover:bg-[#EADCD2]/5 transition-all"
                          >
                            {/* Guest details */}
                            <td className="p-4 space-y-1">
                              <strong className="block text-brand-dark text-sm font-semibold">{appointment.clientName}</strong>
                              <span className="block font-mono text-[10px] text-brand-dark/45">ID: {appointment.id}</span>
                              <div className="flex gap-3 text-[10px] text-brand-dark/60 pt-0.5 font-sans font-light">
                                <span className="flex items-center gap-0.5"><Phone className="w-3 h-3 text-brand-clay" /> {appointment.clientPhone}</span>
                                <span className="flex items-center gap-0.5"><Mail className="w-3 h-3 text-brand-clay" /> {appointment.clientEmail}</span>
                              </div>
                            </td>

                            {/* Treatment */}
                            <td className="p-4">
                              <span className="font-serif text-brand-dark font-semibold text-xs sm:text-sm">{appointment.serviceName}</span>
                              <span className="block text-[10px] text-brand-clay font-bold uppercase mt-0.5">
                                USD ${SERVICES.find(s => s.id === appointment.serviceId)?.price || '95'}
                              </span>
                            </td>

                            {/* Date/Time */}
                            <td className="p-4 space-y-0.5 font-sans font-light">
                              <div className="flex items-center gap-1 font-semibold text-brand-dark">
                                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[11px] text-brand-dark/50">
                                <Clock className="w-3.5 h-3.5 text-brand-gold" />
                                <span>{appointment.time}</span>
                              </div>
                            </td>

                            {/* Therapist */}
                            <td className="p-4">
                              <span className="font-sans text-brand-dark font-medium">{appointment.therapistName}</span>
                              <span className="block text-[9px] text-brand-dark/40 font-mono mt-0.5">Therapist Ref: {appointment.therapistId}</span>
                            </td>

                            {/* Status badge */}
                            <td className="p-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${appointment.status === 'Pending'
                                  ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                  : appointment.status === 'Confirmed'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : appointment.status === 'Done'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                {appointment.status}
                              </span>
                            </td>

                            {/* Action dropdown and buttons */}
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">

                                <select
                                  value={appointment.status}
                                  onChange={(e) => updateStatus(appointment.id, e.target.value as BookingStatus)}
                                  className="bg-white border border-brand-clay/15 text-brand-dark text-[10px] uppercase font-bold tracking-wider rounded-md px-2 py-1.5 focus:outline-none focus:border-brand-clay cursor-pointer shadow-sm"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Done">Done</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>

                                <button
                                  id={`admin-delete-${appointment.id}`}
                                  onClick={() => handleDelete(appointment.id)}
                                  className="w-7 h-7 rounded-md bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white flex items-center justify-center text-red-700 transition-all cursor-pointer shadow-sm"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-12 text-center text-brand-dark/40 italic">
                      No appointments match the search terms or selected status filter.
                    </div>
                  )}
                </div>

                {/* Note about persistence */}
                <div className="text-[10px] text-brand-dark/45 font-sans leading-relaxed text-center italic pt-4">
                  * Note: The administrative panel is securely authenticated via Supabase. Live updates arrive instantly from the real-time database.
                </div>

              </div>
            </>
          ) : (
            <ServicesAdminPanel />
          )}

        </div>
      )}
    </div>
  );
};
