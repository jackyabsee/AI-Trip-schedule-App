import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ExportPreview from '../../components/profile/ExportPreview';
import SettingsGroups from '../../components/profile/SettingsGroups';
import RecentExports from '../../components/profile/RecentExports';
import AccountSecurity from '../../components/profile/AccountSecurity';
import LanguageToggle from '../../components/LanguageToggle';
import MembershipStatus from '../../components/MembershipStatus';
import { User } from '../../types';
import i18n, { initLanguage, setLanguage } from '../../utils/i18n';

export default function SettingsScreen() {
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

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 40 }}>
      <ProfileHeader />
      <View style={{ marginHorizontal: 18, marginTop: 12 }}>
        <LanguageToggle lang={lang} onChangeLanguage={handleLanguageChange} />
      </View>
      <View style={{ marginHorizontal: 18, marginTop: 12 }}>
        <MembershipStatus user={user} onUpdate={setUser} />
      </View>

      <ExportPreview />
      <SettingsGroups />
      <RecentExports />
      <AccountSecurity />
    </ScrollView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: '#F8FAFF' } });