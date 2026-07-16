import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MassageService } from '../types';
import { useAppData } from '../hooks/useAppData';

export const ServicesAdminPanel: React.FC = () => {
  const { services, refreshData } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<MassageService | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState('');
  const [idealFor, setIdealFor] = useState('');
  const [benefitsStr, setBenefitsStr] = useState('');
  const [ingredientsStr, setIngredientsStr] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract unique categories for datalist
  const uniqueCategories = Array.from(new Set(services.map(s => s.category)));

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (service?: MassageService) => {
    if (service) {
      setEditingService(service);
      setName(service.name);
      setCategory(service.category);
      setPrice(service.price);
      setDuration(service.duration);
      setDescription(service.description);
      setIdealFor(service.idealFor);
      setBenefitsStr(service.benefits.join(', '));
      setIngredientsStr((service.ingredients || []).join(', '));
    } else {
      setEditingService(null);
      setName('');
      setCategory('');
      setPrice(0);
      setDuration(0);
      setDescription('');
      setIdealFor('');
      setBenefitsStr('');
      setIngredientsStr('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const { error } = await supabase.from('bright_massage_services').delete().eq('id', id);
      if (error) {
        alert("Error deleting service: " + error.message);
      } else {
        await refreshData();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const id = editingService ? editingService.id : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      let imageUrl = editingService?.image_url || null;

      // Handle Image Upload
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `${id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('service-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('service-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const payload = {
        id,
        name,
        category,
        price,
        duration,
        description,
        ideal_for: idealFor,
        benefits: benefitsStr.split(',').map(s => s.trim()).filter(s => s !== ''),
        ingredients: ingredientsStr.split(',').map(s => s.trim()).filter(s => s !== ''),
        image_url: imageUrl
      };

      if (editingService) {
        const { error } = await supabase.from('bright_massage_services').update(payload).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('bright_massage_services').insert(payload);
        if (error) throw error;
      }

      await refreshData();
      setIsModalOpen(false);
    } catch (err: any) {
      alert("Error saving service: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-white p-6 rounded-xl border border-brand-clay/10 shadow-lg">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-dark/40">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search services by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-brand-clay/15 rounded-md pl-10 pr-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
          />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-brand-olive hover:bg-brand-olive-dark text-white px-4 py-2.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      <div className="overflow-x-auto border border-brand-clay/10 rounded-xl bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#EADCD2]/15 border-b border-brand-clay/15 text-brand-dark/50 font-bold uppercase tracking-wider text-[9px]">
              <th className="p-4">Service Details</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price &amp; Duration</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-clay/10">
            {filteredServices.map(service => (
              <tr key={service.id} className="hover:bg-[#EADCD2]/5 transition-all">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-[#EADCD2]/30 border border-brand-clay/20 overflow-hidden shrink-0 flex items-center justify-center text-brand-clay/40">
                      {service.image_url ? (
                        <img src={service.image_url} alt={service.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <ImageIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <strong className="block text-brand-dark text-sm font-semibold">{service.name}</strong>
                      <span className="block font-mono text-[9px] text-brand-dark/45 mt-0.5">ID: {service.id}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-block bg-brand-clay/10 text-brand-clay px-2.5 py-1 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                    {service.category}
                  </span>
                </td>
                <td className="p-4 font-mono text-xs text-brand-dark/80">
                  <span className="block font-semibold">USD ${service.price}</span>
                  <span className="text-[10px] text-brand-dark/50">{service.duration} Min</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(service)}
                      className="w-7 h-7 rounded-md bg-white border border-brand-clay/15 hover:bg-brand-clay hover:text-white flex items-center justify-center text-brand-dark transition-all cursor-pointer shadow-sm"
                      title="Edit Service"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="w-7 h-7 rounded-md bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white flex items-center justify-center text-red-700 transition-all cursor-pointer shadow-sm"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredServices.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-brand-dark/40 italic">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/65 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl border border-brand-clay/15 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-sand text-brand-dark transition-smooth cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-dark pb-2 border-b border-brand-clay/15">
              {editingService ? 'Edit Service' : 'Create New Service'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-dark uppercase">Service Name <span className="text-brand-clay">*</span></label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white border border-brand-clay/15 rounded-md px-3 py-2 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-dark uppercase">Category <span className="text-brand-clay">*</span></label>
                  <input
                    type="text"
                    list="categories-list"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full bg-white border border-brand-clay/15 rounded-md px-3 py-2 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                  />
                  <datalist id="categories-list">
                    {uniqueCategories.map(cat => <option key={cat} value={cat} />)}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-dark uppercase">Price (USD) <span className="text-brand-clay">*</span></label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    min={0}
                    className="w-full bg-white border border-brand-clay/15 rounded-md px-3 py-2 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-dark uppercase">Duration (Minutes) <span className="text-brand-clay">*</span></label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    required
                    min={0}
                    className="w-full bg-white border border-brand-clay/15 rounded-md px-3 py-2 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-dark uppercase">Description <span className="text-brand-clay">*</span></label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-white border border-brand-clay/15 rounded-md px-3 py-2 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-dark uppercase">Ideal For <span className="text-brand-clay">*</span></label>
                <textarea
                  value={idealFor}
                  onChange={(e) => setIdealFor(e.target.value)}
                  required
                  rows={2}
                  className="w-full bg-white border border-brand-clay/15 rounded-md px-3 py-2 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-dark uppercase">Benefits (Comma-Separated) <span className="text-brand-clay">*</span></label>
                <input
                  type="text"
                  value={benefitsStr}
                  onChange={(e) => setBenefitsStr(e.target.value)}
                  required
                  placeholder="Deep relaxation, Muscle tension relief"
                  className="w-full bg-white border border-brand-clay/15 rounded-md px-3 py-2 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-dark uppercase">Ingredients (Comma-Separated)</label>
                <input
                  type="text"
                  value={ingredientsStr}
                  onChange={(e) => setIngredientsStr(e.target.value)}
                  placeholder="Argan Oil, Eucalyptus"
                  className="w-full bg-white border border-brand-clay/15 rounded-md px-3 py-2 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-dark uppercase">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  className="w-full bg-white border border-brand-clay/15 rounded-md px-3 py-2 text-xs text-brand-dark focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay/40 transition-all"
                />
                {editingService?.image_url && !imageFile && (
                  <p className="text-[10px] text-brand-dark/50 mt-1 italic">Current image will be kept if no new file is selected.</p>
                )}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-olive text-white px-6 py-3 rounded-md font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Service Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
