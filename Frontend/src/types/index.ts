// src/types/index.ts

export interface UserInput {
  currency: string;
  budget: number;
  startDate: string;
  endDate: string;
  destination: string;
  travelStyle: string[];
  interests: string[];
  dining: string[];
  accommodation: string[];
  language?: string;
  numTourists?: number; // change from string to number
}

// 這是每天行程內部的單一活動
export interface ScheduleItem {
  day?: number; // 之前我們支援的扁平化結構天數
  time: string;
  placeName: string;
  address: string;
  price?: number;
  activities: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
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

// 新增：定義 AI 完整回傳的資料結構
export interface GeneratedTripData {
  title: string;        // 行程專屬名稱 (例如："東京五天四夜賞櫻之旅")
  summary: string;      // 行程總結
  schedule: ScheduleItem[];
  hotels?: Hotel[];
}