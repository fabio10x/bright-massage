import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, Compass, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import { useAppData } from '../hooks/useAppData';
import { GalleryItem } from '../types';

const getItemImage = (id: string) => {
  if (id === 'gal-hammam') return '/src/assets/images/hammam_steam_room_1784194541253.jpg';
  if (id === 'gal-session') return '/src/assets/images/glistening_back_massage_1784194946250.jpg';
  if (id === 'gal-arches') return '/src/assets/images/massage_room_starry_1784194552089.jpg';
  if (id === 'gal-lounge') return '/src/assets/images/spa_interior_shelves_1784194922286.jpg';
  if (id === 'gal-argan') return '/src/assets/images/glistening_massage_oil_1784194564535.jpg';
  if (id === 'gal-tea') return '/src/assets/images/moroccan_mint_tea_1784195009613.jpg';
  return null;
};

const getItemHeightClass = (id: string) => {
  switch (id) {
    case 'gal-hammam': return 'h-[380px]';
    case 'gal-lounge': return 'h-[320px]';
    case 'gal-session': return 'h-[360px]';
    case 'gal-argan': return 'h-[280px]';
    case 'gal-tea': return 'h-[340px]';
    case 'gal-arches': return 'h-[350px]';
    default: return 'h-[300px]';
  }
};

export const GalleryView: React.FC = () => {
  const { gallery: GALLERY } = useAppData();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Hammam' | 'Therapeutic' | 'Decor' | 'Rituals'>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? GALLERY
    : GALLERY.filter(item => item.category === selectedCategory);

  return (
    <div id="gallery-view" className="space-y-16 py-8 md:py-12">
      {/* Gallery Header */}
      <section id="gallery-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-brand-clay font-bold uppercase text-[10px] tracking-[0.25em]">Visual Sanctuary</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-dark tracking-tight font-semibold">
            Smile Gallery &amp; Ambiance
          </h2>
          <p className="text-brand-dark/60 text-xs sm:text-sm font-sans leading-relaxed">
            Our spaces are custom tailored to match authentic Moroccan lime-plaster architecture and tranquil acoustic scales. View the detailed photography outlines illustrating our warm, relaxing sanctuary below.
          </p>
        </div>

        {/* Categories toggles */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
          {(['All', 'Hammam', 'Therapeutic', 'Decor', 'Rituals'] as const).map((cat) => (
            <button
              id={`gallery-cat-${cat}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 font-sans text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-olive text-white shadow-md'
                  : 'bg-white hover:bg-[#EADCD2]/20 text-brand-dark/70 border border-brand-clay/15'
              }`}
            >
              {cat === 'All' ? 'All Spaces' : `${cat} Frames`}
            </button>
          ))}
        </div>
      </section>

      {/* Brick Masonry Grid - Replicating Screen 1 exactly */}
      <section id="gallery-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout 
          className="gallery-masonry space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                id={`gallery-item-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveItem(item)}
                className="break-inside-avoid bg-white rounded-xl border border-brand-clay/10 overflow-hidden shadow-md hover:shadow-xl hover:border-brand-clay/35 transition-all group cursor-pointer relative mb-6"
              >
                {/* Photo Sketch / Placeholder Block or Real Image with varying aspect ratios */}
                <div className={`w-full relative overflow-hidden border-b border-brand-clay/15 ${getItemHeightClass(item.id)}`}>
                  {getItemImage(item.id) ? (
                    <img
                      src={getItemImage(item.id)!}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#EADCD2]/30 flex flex-col justify-center items-center p-6 text-center">
                      <div className="absolute inset-0 bg-moroccan-pattern opacity-10 animate-pattern-slow" />
                      <div className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center text-brand-clay mb-2.5 transition-transform duration-500 group-hover:scale-110">
                        <ImageIcon className="w-5 h-5 text-brand-clay" />
                      </div>
                      <h4 className="font-serif text-xs font-bold text-brand-dark max-w-[180px] leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-brand-dark/50 leading-relaxed mt-4 font-mono italic max-w-[210px] line-clamp-6">
                        {item.photoDesc}
                      </p>
                    </div>
                  )}

                  {/* Left floating category indicator tag - exactly like Smile Gallery Screen 1 */}
                  <div className="absolute top-4 left-4 bg-brand-dark/65 backdrop-blur-xs border border-brand-clay/10 text-white text-[8.5px] font-bold tracking-widest uppercase px-3 py-1 z-10">
                    {item.tag}
                  </div>

                  {/* Overlaid Inspect Lens Frame / Hover specifications */}
                  <div className="absolute inset-0 bg-brand-dark/65 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center p-6 text-center transition-smooth duration-300 backdrop-blur-xs z-20">
                    <div className="w-10 h-10 rounded-full bg-white text-brand-clay flex items-center justify-center shadow-md mb-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Eye className="w-4 h-4" />
                    </div>
                    {getItemImage(item.id) && (
                      <p className="text-[9px] text-white/90 leading-relaxed font-mono italic max-w-[210px] line-clamp-6 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {item.photoDesc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Caption details box */}
                <div className="p-5 bg-white space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-bold text-brand-clay tracking-wider">
                      {item.category} Registry
                    </span>
                  </div>
                  <h3 className="font-serif text-sm font-bold text-brand-dark leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-brand-dark/60 leading-relaxed font-sans font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Fullscreen Photo Inspector Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto p-4 bg-brand-dark/65 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setActiveItem(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-xl border border-brand-clay/15 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                id="close-gallery-inspector"
                onClick={() => setActiveItem(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-sand text-brand-dark transition-smooth cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title / Header */}
              <div className="space-y-1">
                <span className="bg-brand-clay/15 text-brand-clay text-[9px] font-bold tracking-widest uppercase px-3 py-1">
                  {activeItem.tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark tracking-tight pt-1">
                  {activeItem.title}
                </h3>
              </div>

              {/* Real Image representation inside modal if loaded */}
              {getItemImage(activeItem.id) && (
                <div className="w-full h-48 sm:h-64 overflow-hidden rounded-lg border border-brand-clay/10">
                  <img
                    src={getItemImage(activeItem.id)!}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Visual Guide Box */}
              <div className="bg-[#EADCD2]/10 p-5 rounded-lg border border-brand-clay/10 space-y-2">
                <span className="block text-[9px] font-mono uppercase font-semibold text-brand-dark/40 tracking-wider">Professional Photography Specification</span>
                <p className="text-xs text-brand-dark/70 font-mono italic leading-relaxed">
                  {activeItem.photoDesc}
                </p>
              </div>

              {/* Caption */}
              <div className="space-y-1.5">
                <span className="block text-[9px] uppercase font-bold text-brand-dark/40 tracking-wider">Atmospheric Purpose</span>
                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans font-light">
                  {activeItem.description}
                </p>
              </div>

              <div className="pt-2 border-t border-brand-clay/15 flex justify-end">
                <button
                  id="gallery-modal-close"
                  onClick={() => setActiveItem(null)}
                  className="bg-brand-olive text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer"
                >
                  Close Spec Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
