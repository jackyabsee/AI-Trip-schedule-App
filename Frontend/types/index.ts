export interface UserInput {
  budget: number;
  startDate: string;
  endDate: string;
  duration: number;
  travelCompanions: string;
  destination: string;
  travelStyle: string[];
  interests: string[];
  dining: string[];
  accommodation: string[];
  numTourists?: number; // change from string to number
}

export interface ScheduleItem {
  time: string;
  placeName: string;
  address: string;
  price: number;
  activities: string;
  notes: string;
}

export interface Hotel {
  name: string;
  address: string;
  type: string;
  pricePerNight: number;
  bookingUrl: string;
}

export interface User {
  email: string;
  membership: {
    tier: 'free' | 'premium' | 'vip';
    updatedAt: string;
  };
}