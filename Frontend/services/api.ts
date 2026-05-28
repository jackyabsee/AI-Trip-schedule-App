import axios from 'axios';
import { Hotel, ScheduleItem, User, UserInput } from '../types';
import { supabase } from '../configs/supabase';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

export const generateSchedule = async (input: UserInput) => {
  const response = await axios.post(`${API_BASE_URL}/schedule/generate`, input);
  return response.data as { schedule: ScheduleItem[]; hotels: Hotel[] };
};

export const updateMembership = async (tier: 'free' | 'premium' | 'vip') => {
  // Get current session access token from Supabase client and send to backend
  try {
    const { data } = await supabase.auth.getSession();
    const token = (data as any)?.session?.access_token;
    const response = await axios.patch(`${API_BASE_URL}/users/membership`, { tier }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as { user: User };
  } catch (err) {
    throw err;
  }
};

export const fetchFormOptions = async () => {
  const response = await axios.get(`${API_BASE_URL}/form/options`);
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