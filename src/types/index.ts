export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  allowExtraGuests: boolean;
  maxExtraGuests: number;
}

export interface Waiter {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specialties: string[];
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  timeSlot: TimeSlot;
  table: Table;
  guestCount: number;
  extraGuests: number;
  waiter: Waiter;
  specialRequests: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface RestaurantConfig {
  timeSlots: TimeSlot[];
  tables: Table[];
  waiters: Waiter[];
}

export interface RestaurantSettings {
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    country: string;
  };
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  pricing: {
    entryFee: number;
    currency: string;
    photoSession: number;
  };
}

export type ViewMode = 'reservation' | 'overview' | 'settings';