import axios from 'axios';
import { Hotel, ScheduleItem, User, UserInput , GeneratedTripData} from '../types';
import { supabase } from '../configs/supabase';

const BASE = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://172.28.160.33:4000/api';

const buildHeaders = async () => {
  const { data } = await supabase.auth.getSession();
  const session = (data as any)?.session;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (session && session.access_token) headers.Authorization = `Bearer ${session.access_token}`;
  return headers;
};

export const generateSchedule = async (payload: UserInput) => {
  const url = `${BASE}/schedule/generate`;
  const headers = await buildHeaders();
  const res = await axios.post(url, payload, { headers });
  return res.data as GeneratedTripData & { id?: string | number };
};

export const updateMembership = async (tier: 'free' | 'premium' | 'vip') => {
  // Get current session access token from Supabase client and send to backend
  try {
    const { data } = await supabase.auth.getSession();
    const token = (data as any)?.session?.access_token;
    const response = await axios.patch(`${BASE}/users/membership`, { tier }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as { user: User };
  } catch (err) {
    throw err;
  }
};

export const fetchFormOptions = async () => {
  const response = await axios.get(`${BASE}/form/options`);
  return response.data;
};

export const fetchScheduleById = async (id: string) => {
  const url = `${BASE}/schedule/${id}`;
  const headers = await buildHeaders();
  const res = await axios.get(url, { headers });
  return res.data as any;
};

// src/services/api.ts
// Add this below your fetchScheduleById function

export const updateSchedulePayload = async (id: string, payload: any, title: string) => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  
  const response = await axios.put(
    `${BASE}/schedule/${id}`,
    { payload, title },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// --- For future dynamic options ---
// export const fetchFormOptions = async () => {
//   const response = await axios.get(`${API_BASE_URL}/form/options`);
//   return response.data;
// };
// export const fetchDistinctionImage = async (type: string, value: string) => {
//   const response = await axios.get(`${API_BASE_URL}/distinctions/images`, { params: { type, value } });
//   return response.data.imageUrl;
// };