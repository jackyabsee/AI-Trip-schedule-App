import { supabase } from '../configs/supabase';

export const fetchSchedules = async (userId: string) => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};

export const fetchPresetSchedules = async () => {
  const { data, error } = await supabase
    .from('preset_schedules')
    .select('*');
  if (error) throw error;
  return data;
};

export const insertSchedule = async (schedule: any) => {
  const { data, error } = await supabase
    .from('schedules')
    .insert([schedule]);
  if (error) throw error;
  return data;
};

export const updateSchedule = async (id: number | string, updates: any) => {
  const { data, error } = await supabase
    .from('schedules')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
};

// 1. Fetch the user's nearest upcoming trip
export const fetchUserUpcomingTrip = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('user_id', userId)
    .gte('start_date', today)
    .order('start_date', { ascending: true })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // Ignore "Row not found"
  return data;
};

// 2. Fetch the global suggested trip (user_id IS NULL)
export const fetchSuggestedTrip = async () => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .is('user_id', null)
    .limit(1)
    .single();
    
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};
