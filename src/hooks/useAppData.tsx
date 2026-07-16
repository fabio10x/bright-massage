import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MassageService, TeamMember, GalleryItem, Review, Appointment, Inquiry, BookingStatus } from '../types';

interface AppDataContextType {
  services: MassageService[];
  team: TeamMember[];
  gallery: GalleryItem[];
  reviews: Review[];
  milestones: any[];
  refreshData: () => Promise<void>;
}

const AppDataContext = createContext<AppDataContextType>({
  services: [],
  team: [],
  gallery: [],
  reviews: [],
  milestones: [],
  refreshData: async () => {}
});

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<MassageService[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);

  const refreshData = async () => {
    const [
        { data: servicesData },
        { data: teamData },
        { data: galleryData },
        { data: reviewsData },
        { data: milestonesData }
      ] = await Promise.all([
        supabase.from('bright_massage_services').select('*'),
        supabase.from('bright_massage_team_members').select('*'),
        supabase.from('bright_massage_gallery_items').select('*'),
        supabase.from('bright_massage_reviews').select('*'),
        supabase.from('bright_massage_milestones').select('*').order('year', { ascending: true })
      ]);

      if (servicesData) {
        setServices(servicesData.map((s: any) => ({
          ...s,
          idealFor: s.ideal_for
        })));
      }
      if (teamData) {
        setTeam(teamData.map((t: any) => ({
          ...t,
          photoDesc: t.photo_desc
        })));
      }
      if (galleryData) {
        setGallery(galleryData.map((g: any) => ({
          ...g,
          photoDesc: g.photo_desc
        })));
      }
      if (reviewsData) {
        setReviews(reviewsData.map((r: any) => ({
          ...r,
          clientName: r.client_name,
          avatarColor: r.avatar_color
        })));
      }
      if (milestonesData) {
        setMilestones(milestonesData);
      }
    };

  useEffect(() => {
    refreshData();

    const servicesSub = supabase
      .channel('public:bright_massage_services')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bright_massage_services' }, refreshData)
      .subscribe();

    return () => {
      supabase.removeChannel(servicesSub);
    };
  }, []);

  return (
    <AppDataContext.Provider value={{ services, team, gallery, reviews, milestones, refreshData }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);

