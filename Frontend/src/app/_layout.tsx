import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import i18n, { subscribeLanguageChange, initLanguage } from '../utils/i18n';
import { supabase } from '../configs/supabase';
import { useAuthStore } from '../store/useAuthStore';

export default function RootLayout() {
  const [locale, setLocale] = useState(i18n.locale || 'zh-TW');
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    let mounted = true;

    // 1. Get initial language
    (async () => {
      const activeLanguage = await initLanguage();
      if (mounted) setLocale(activeLanguage);
    })();

    // 2. Initialize Supabase Auth Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) setAuth(session);
    });

    // 3. Listen for future login/logout events
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setAuth(session);
    });

    const unsubscribe = subscribeLanguageChange((language) => {
      if (mounted) setLocale(language);
    });

    return () => {
      mounted = false;
      unsubscribe();
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Stack key={locale}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="input" options={{ headerShown: false }} />
        {/* Add the new auth screen route */}
        <Stack.Screen name="auth" options={{ presentation: 'modal', title: 'Sign In' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaProvider>
  );
}