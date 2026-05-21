import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LanguageToggle from '../../components/LanguageToggle';
import MembershipStatus from '../../components/MembershipStatus';
import { User } from '../../types';
import i18n, { initLanguage, setLanguage } from '../../utils/i18n';

export default function SettingsScreen() {
  const [user, setUser] = useState<User>({
    email: 'user@example.com',
    membership: { tier: 'free', updatedAt: new Date().toISOString() },
  });
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
      <Text style={styles.header}>{i18n.t('settings')}</Text>
      <LanguageToggle lang={lang} onChangeLanguage={handleLanguageChange} />
      <MembershipStatus user={user} onUpdate={setUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});