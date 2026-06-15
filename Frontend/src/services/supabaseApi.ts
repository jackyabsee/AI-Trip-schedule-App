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
