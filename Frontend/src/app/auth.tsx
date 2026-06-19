import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signIn, signUp } from '../services/supabaseAuth';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../configs/supabase'; 
import * as Linking from 'expo-linking';

export default function AuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }
    
    setLoading(true);
    try {
      await signIn(email, password);
      router.back(); // Close modal and return to form on success
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter an email and password.');
      return;
    }

    setLoading(true);
    try {
      const data = await signUp(email, password);
      
      // If email confirmation is disabled, Supabase logs them in automatically and returns a session
      if (data?.session) {
        router.back(); // Seamlessly drop them into the planning form
      } else {
        // If email confirmation is required, tell them to check their inbox
        Alert.alert(
          'Check your email',
          'Account created! Please check your email to verify your account before logging in.'
        );
      }
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Missing Email', 'Please enter your email address in the box above to reset your password.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: Linking.createURL('/'), // Return to app after clicking email link
      });
      if (error) throw error;
      Alert.alert('Check your inbox', 'A password reset link has been sent to your email.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="airplane" size={48} color="#0B51F1" />
        <Text style={styles.title}>Welcome Aboard</Text>
        <Text style={styles.subtitle}>Sign in to generate AI travel schedules</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0B51F1" style={{ marginTop: 20 }} />
        ) : (
          <>
            <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUp}>
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FD', padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: '#111827', marginTop: 16 },
  subtitle: { fontSize: 16, color: '#6B7280', marginTop: 8 },
  form: { gap: 16 },
  input: { backgroundColor: '#fff', height: 54, borderRadius: 12, paddingHorizontal: 16, borderWidth: 1, borderColor: '#D7DBEA', fontSize: 16 },
  primaryButton: { backgroundColor: '#0B51F1', height: 54, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryButton: { height: 54, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#0B51F1' },
  secondaryButtonText: { color: '#0B51F1', fontSize: 16, fontWeight: '700' },
  forgotPassword: { marginTop: 12, alignItems: 'center', paddingVertical: 8 },
  forgotPasswordText: { color: '#0B51F1', fontSize: 14, fontWeight: '600' }
});