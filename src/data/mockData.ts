import { TimeSlot, Table, Waiter, RestaurantConfig, RestaurantSettings, Reservation } from '../types';

export const mockTimeSlots: TimeSlot[] = [
  { id: '1', time: '10:00', available: true },
  { id: '2', time: '10:30', available: true },
  { id: '3', time: '11:00', available: true },
  { id: '4', time: '11:30', available: true },
  { id: '5', time: '12:00', available: true },
  { id: '6', time: '12:30', available: true },
  { id: '7', time: '13:00', available: true },
  { id: '8', time: '13:30', available: true },
  { id: '9', time: '14:00', available: true },
  { id: '10', time: '14:30', available: true },
  { id: '11', time: '15:00', available: true },
  { id: '12', time: '15:30', available: true },
  { id: '13', time: '16:00', available: true },
  { id: '14', time: '16:30', available: true },
  { id: '15', time: '17:00', available: true },
  { id: '16', time: '17:30', available: true },
  { id: '17', time: '18:00', available: true },
  { id: '18', time: '18:30', available: true },
  { id: '19', time: '19:00', available: true },
  { id: '20', time: '19:30', available: true },
  { id: '21', time: '20:00', available: true },
  { id: '22', time: '20:30', available: true },
];

export const mockTables: Table[] = [
  { id: '1', number: 1, capacity: 2, allowExtraGuests: true, maxExtraGuests: 1 },
  { id: '2', number: 2, capacity: 2, allowExtraGuests: true, maxExtraGuests: 1 },
  { id: '3', number: 3, capacity: 4, allowExtraGuests: true, maxExtraGuests: 2 },
  { id: '4', number: 4, capacity: 4, allowExtraGuests: true, maxExtraGuests: 2 },
  { id: '5', number: 5, capacity: 6, allowExtraGuests: true, maxExtraGuests: 2 },
  { id: '6', number: 6, capacity: 6, allowExtraGuests: true, maxExtraGuests: 2 },
  { id: '7', number: 7, capacity: 8, allowExtraGuests: false, maxExtraGuests: 0 },
  { id: '8', number: 8, capacity: 8, allowExtraGuests: false, maxExtraGuests: 0 },
];

export const mockWaiters: Waiter[] = [
  {
    id: '1',
    name: 'Sakura-chan',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    rating: 4.9,
    specialties: ['Kawaii Desserts', 'Fotoshootings', 'Anime Wissen']
  },
  {
    id: '2',
    name: 'Yuki-chan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    rating: 4.8,
    specialties: ['Latte Art', 'Cosplay Expertin', 'Gaming Begleitung']
  },
  {
    id: '3',
    name: 'Momo-chan',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    rating: 4.9,
    specialties: ['Süße Bento', 'Singen', 'Manga Empfehlungen']
  },
  {
    id: '4',
    name: 'Hana-chan',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
    rating: 4.7,
    specialties: ['Themen-Cocktails', 'Tanzen', 'Unterhaltung']
  },
  {
    id: '5',
    name: 'Rei-chan',
    avatar: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=100&h=100&fit=crop&crop=face',
    rating: 4.8,
    specialties: ['Charakter Cafés', 'Fotografie', 'Otaku Kultur']
  },
];

export const mockRestaurantConfig: RestaurantConfig = {
  timeSlots: mockTimeSlots,
  tables: mockTables,
  waiters: mockWaiters,
};

export const mockRestaurantSettings: RestaurantSettings = {
  name: 'Meido Chi',
  description: 'メイド喫茶 - Dein magisches Maid Café Erlebnis',
  location: {
    address: '123 Kawaii Street',
    city: 'Shibuya, Tokyo',
    country: 'Japan'
  },
  openingHours: {
    monday: { open: '10:00', close: '21:00', closed: false },
    tuesday: { open: '10:00', close: '21:00', closed: false },
    wednesday: { open: '10:00', close: '21:00', closed: false },
    thursday: { open: '10:00', close: '21:00', closed: false },
    friday: { open: '10:00', close: '22:00', closed: false },
    saturday: { open: '09:00', close: '22:00', closed: false },
    sunday: { open: '09:00', close: '21:00', closed: false }
  },
  contact: {
    phone: '+81 3-1234-5678',
    email: 'info@meidochi.jp',
    website: 'www.meidochi.jp'
  },
  pricing: {
    entryFee: 500,
    currency: '¥',
    photoSession: 300
  }
};

export const mockReservations: Reservation[] = [
  {
    id: '1',
    customerName: 'Max Mustermann',
    customerEmail: 'max@example.com',
    customerPhone: '+49 123 456789',
    date: '2024-01-15',
    timeSlot: { id: '5', time: '12:00', available: true },
    table: { id: '1', number: 1, capacity: 2, allowExtraGuests: true, maxExtraGuests: 1 },
    guestCount: 2,
    extraGuests: 0,
    waiter: mockWaiters[0],
    specialRequests: 'Geburtstag meiner Freundin',
    status: 'confirmed',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    customerName: 'Lisa Schmidt',
    customerEmail: 'lisa@example.com',
    customerPhone: '+49 987 654321',
    date: '2024-01-15',
    timeSlot: { id: '10', time: '14:30', available: true },
    table: { id: '3', number: 3, capacity: 4, allowExtraGuests: true, maxExtraGuests: 2 },
    guestCount: 4,
    extraGuests: 1,
    waiter: mockWaiters[1],
    specialRequests: 'Allergien: Nüsse',
    status: 'confirmed',
    createdAt: '2024-01-12T14:30:00Z'
  },
  {
    id: '3',
    customerName: 'Tom Weber',
    customerEmail: 'tom@example.com',
    customerPhone: '+49 555 123456',
    date: '2024-01-16',
    timeSlot: { id: '18', time: '18:30', available: true },
    table: { id: '2', number: 2, capacity: 2, allowExtraGuests: true, maxExtraGuests: 1 },
    guestCount: 2,
    extraGuests: 0,
    waiter: mockWaiters[2],
    specialRequests: 'Cosplay Event',
    status: 'pending',
    createdAt: '2024-01-13T16:00:00Z'
  }
];