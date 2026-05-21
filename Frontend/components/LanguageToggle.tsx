import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import i18n from '../utils/i18n';
import languages from '../assets/translations/languages.json';

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  zh: '中文'
  // Add more if you add more languages, e.g. 'ja': '日本語'
};

interface LanguageToggleProps {
  lang: string;
  onChangeLanguage: (lng: string) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, onChangeLanguage }) => {
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

  useEffect(() => {
    setAvailableLanguages(Object.keys(languages));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{i18n.t('select_language')}</Text>
      {availableLanguages.map((lng) => (
        <Button
          key={lng}
          title={LANGUAGE_LABELS[lng] || lng}
          onPress={() => onChangeLanguage(lng)}
          disabled={lang === lng}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
});

export default LanguageToggle;