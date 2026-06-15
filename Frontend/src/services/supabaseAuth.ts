// services/supabaseAuth.ts
import { supabase } from '../configs/supabase';
import * as Linking from 'expo-linking';

export const signUp = async (email: string, password: string) => {
  // This generates the correct deep link for Expo Go (e.g., exp://192.168.1.5:8081)
  const redirectUrl = Linking.createURL('/'); 

  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: redirectUrl,
    }
  });
  
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ 
    email, 
    password , 
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = () => {
  return supabase.auth.getUser();
};