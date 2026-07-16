export type BookingStatus = 'Pending' | 'Confirmed' | 'Done' | 'Cancelled';

export interface MassageService {
  id: string;
  name: string;
  category: string;
  duration: number; // in minutes
  price: number; // in USD or equivalent
  description: string;
  benefits: string[];
  ingredients?: string[]; // e.g. Argan Oil, Orange Blossom
  idealFor: string;
  image_url?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  photoDesc: string; // The specific image instruction as requested
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  therapistId: string;
  therapistName: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  category: 'Hammam' | 'Therapeutic' | 'Decor' | 'Rituals';
  title: string;
  description: string;
  photoDesc: string; // The descriptive image prompt requested by the user
  tag: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  clientName: string;
  role: string; // e.g., 'Local Guide', 'Verified Guest'
  rating: number;
  text: string;
  date: string;
  avatarColor: string;
}
