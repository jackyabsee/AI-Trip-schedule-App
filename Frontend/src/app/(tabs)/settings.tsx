// app/(tabs)/settings.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ExportPreview from '../../components/profile/ExportPreview';
import SettingsGroups from '../../components/profile/SettingsGroups';
import RecentExports from '../../components/profile/RecentExports';
import AccountSecurity from '../../components/profile/AccountSecurity';
import LanguageToggle from '../../components/LanguageToggle';
import MembershipStatus from '../../components/MembershipStatus';
import { User } from '../../types';
import i18n, { initLanguage, setLanguage } from '../../utils/i18n';

// Import Auth dependencies
import { useAuthStore } from '../../store/useAuthStore';
import { signOut } from '../../services/supabaseAuth';

export default function SettingsScreen() {
  const router = useRouter();
  const authUser = useAuthStore((state) => state.user);

  // Maintain existing state
  const [user, setUser] = useState<User>({
    email: 'user@example.com',
    membership: { tier: 'free', updatedAt: new Date().toISOString() },
  });
  const [lang, setLang] = useState<string>(i18n.locale || 'en');

  useEffect(() => {
    (async () => {
      await initLanguage();
      setLang(i18n.locale);
    })();
  }, []);

  const handleLanguageChange = async (lng: string) => {
    await setLanguage(lng);
    setLang(lng);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/'); // Redirect to home screen upon logout
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* 1. Conditional Header Rendering */}
      {authUser ? (
        <ProfileHeader />
      ) : (
        <View style={styles.guestHeader}>
          <Text style={styles.guestTitle}>Welcome, Guest</Text>
          <Text style={styles.guestSubtitle}>Sign in to save and export your trips</Text>
        </View>
      )}

      <View style={{ marginHorizontal: 18, marginTop: 12 }}>
        <LanguageToggle lang={lang} onChangeLanguage={handleLanguageChange} />
      </View>
      <View style={{ marginHorizontal: 18, marginTop: 12 }}>
        <MembershipStatus user={user} onUpdate={setUser} />
      </View>

      {/* 2. Login / Logout Action Buttons */}
      <View style={styles.authContainer}>
        {!authUser ? (
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/auth')}>
            <Text style={styles.loginButtonText}>Sign In / Create Account</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        )}
      </View>

      <ExportPreview />
      <SettingsGroups />
      
      {/* 3. Hide account-specific views from guests */}
      {authUser && <RecentExports />}
      {authUser && <AccountSecurity />}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({ 
  root: { flex: 1, backgroundColor: '#F8FAFF' },
  guestHeader: {
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 18,
    marginTop: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E9F2',
  },
  guestTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  guestSubtitle: { marginTop: 6, color: '#6B7280', textAlign: 'center' },
  authContainer: { marginHorizontal: 18, marginTop: 20, marginBottom: 8 },
  loginButton: {
    backgroundColor: '#0B51F1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  logoutButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA'
  },
  logoutButtonText: { color: '#DC2626', fontSize: 16, fontWeight: '700' },
});