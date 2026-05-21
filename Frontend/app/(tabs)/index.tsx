import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LanguageToggle from '../../components/LanguageToggle';
import i18n, { initLanguage, setLanguage } from '../../utils/i18n';

export default function Index() {
  const [lang, setLang] = useState<string>(i18n.locale || 'zh'); // Use i18n.locale as initial value

  useEffect(() => {
    (async () => {
      await initLanguage();
      setLang(i18n.locale); // Always use the actual i18n.locale after init
    })();
  }, []);

  const handleLanguageChange = async (lng: string) => {
    await setLanguage(lng);
    setLang(lng);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{i18n.t('welcome')}</Text>
      <LanguageToggle lang={lang} onChangeLanguage={handleLanguageChange} />
      <Link href="/input" asChild>
        <Button title={i18n.t('start_planning')} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});