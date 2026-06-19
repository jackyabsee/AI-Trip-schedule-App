import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../utils/i18n';
import languages from '../assets/translations/languages.json';

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  "zh-TW": '中文'
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
      <Text style={styles.label}>{i18n.t('select_language')}</Text>
      <View style={styles.toggleRow}>
        {availableLanguages.map((lng) => {
          const active = lang === lng;

          return (
            <Pressable
              key={lng}
              onPress={() => onChangeLanguage(lng)}
              style={({ pressed }) => [
                styles.languagePill,
                active ? styles.languagePillActive : null,
                pressed ? styles.languagePillPressed : null,
              ]}
            >
              <Ionicons
                name="globe-outline"
                size={14}
                color={active ? '#FFFFFF' : '#0B51F1'}
              />
              <Text style={[styles.languageText, active ? styles.languageTextActive : null]}>
                {LANGUAGE_LABELS[lng] || lng}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7DBEA',
  },
  languagePillActive: {
    backgroundColor: '#0B51F1',
    borderColor: '#0B51F1',
  },
  languagePillPressed: {
    opacity: 0.9,
  },
  languageText: {
    color: '#0B51F1',
    fontSize: 12,
    fontWeight: '700',
  },
  languageTextActive: {
    color: '#FFFFFF',
  },
});

export default LanguageToggle;