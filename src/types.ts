export type TabType = 'home' | 'services' | 'bookings' | 'community' | 'profile' | 'notifications' | 'event-detail';

export interface Society {
  id: string;
  name: string;
  location: string;
  city: string;
  image: string;
  flatsCount: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  colorClass: string;
  bgColorClass: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: string;
  image: string;
  description: string;
  popular?: boolean;
}

export interface Booking {
  id: string;
  serviceTitle: string;
  category: string;
  status: 'on_the_way' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  etaMinutes?: number;
  scheduledTime: string;
  workerName: string;
  workerPhone: string;
  workerPhoto: string;
  workerRating: number;
  otp: string;
  price: number;
  address: string;
  notes?: string;
}

export interface ServiceCamp {
  id: string;
  category: string;
  title: string;
  dateStr: string;
  priceInfo: string;
  joinedCount: number;
  targetCount: number;
  badgeClass: string;
  borderAccentColor: string;
  hasPackages?: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'service' | 'community' | 'urgent' | 'payment';
  title: string;
  timeAgo: string;
  description: string;
  isRead: boolean;
  section: 'today' | 'yesterday';
  targetTab?: TabType;
}

export interface Review {
  id: string;
  author: string;
  tower: string;
  rating: number;
  comment: string;
  avatarInitial: string;
}
