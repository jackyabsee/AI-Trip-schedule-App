import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import i18n from '../../utils/i18n';

interface Props {
  labelKey: string;
  options: string[]; // keys in translation
  selected: string[];
  onToggle: (opt: string) => void;
}

export default function OptionSelector({ labelKey, options, selected, onToggle }: Props) {
  const otherSelected = selected.includes('Other') || selected.includes('other');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n.t(labelKey)}</Text>
      <View style={styles.row}>
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <TouchableOpacity key={opt} style={[styles.chip, active && styles.chipActive]} onPress={() => onToggle(opt)}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{i18n.t(opt)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {otherSelected && (
        <TextInput placeholder={i18n.t('Other')} style={styles.otherInput} onChangeText={(t) => onToggle(`__other::${t}`)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, marginTop: 12 },
  label: { color: '#374151', fontWeight: '600', marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#F3F4F6', borderRadius: 20, marginRight: 8, marginBottom: 8 },
  chipActive: { backgroundColor: '#4F46E5' },
  chipText: { color: '#374151' },
  chipTextActive: { color: '#FFFFFF' },
  otherInput: { marginTop: 8, backgroundColor: '#fff', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#E6E7F2' },
});
