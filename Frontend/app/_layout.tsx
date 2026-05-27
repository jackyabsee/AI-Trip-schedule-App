import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import i18n, { subscribeLanguageChange, initLanguage } from '../utils/i18n';

export default function RootLayout() {
  const [locale, setLocale] = useState(i18n.locale || 'zh');

  useEffect(() => {
    let mounted = true;

    (async () => {
      const activeLanguage = await initLanguage();
      if (mounted) {
        setLocale(activeLanguage);
      }
    })();

    const unsubscribe = subscribeLanguageChange((language) => {
      if (mounted) {
        setLocale(language);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <Stack key={locale}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="input" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
