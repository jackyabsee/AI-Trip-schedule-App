import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import PlanningForm from '../../components/planning/PlanningForm';
import { useAuthStore } from '../../store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';

export default function PlansPage() {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const router = useRouter();
  
  // Track if we've already prompted them so we don't cause an infinite loop
  const hasPrompted = useRef(false);

  // Automatically pop up the auth modal when they visit this tab if not logged in
  useFocusEffect(
    useCallback(() => {
      if (isInitialized && !user && !hasPrompted.current) {
        hasPrompted.current = true;
        router.push('/auth');
      }
    }, [isInitialized, user])
  );

  // Wait for Supabase to finish checking the session on app load
  if (!isInitialized) return null;

  // If anonymous, show a locked placeholder screen
  if (!user) {
    return (
      <View style={styles.container}>
        <Ionicons name="lock-closed-outline" size={64} color="#0B51F1" style={{ marginBottom: 20 }} />
        <Text style={styles.title}>Authentication Required</Text>
        <Text style={styles.subtitle}>Please sign in or create an account to start planning your custom AI trip schedule.</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth')}>
          <Text style={styles.buttonText}>Sign In / Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Reset the prompt ref so it works again if they log out and come back
  hasPrompted.current = false;

  // If logged in, show the actual form!
  return <PlanningForm />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FD',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#0B51F1',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#0B51F1',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});