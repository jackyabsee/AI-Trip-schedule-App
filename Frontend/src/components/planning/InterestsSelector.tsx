import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import i18n from '../../utils/i18n';

interface Props {
  selected: string[];
  onToggle: (id: string) => void;
}

const SAMPLE: string[] = ['food', 'cultural', 'nature', 'shopping', 'art', 'Other'];

export default function InterestsSelector({ selected, onToggle }: Props) {
  const otherSelected = selected.includes('Other') || selected.some((s) => s.startsWith('__other::'));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n.t('interests')}</Text>
      <View style={styles.row}>
        {SAMPLE.map((s) => {
          const active = selected.includes(s) || selected.some((x) => x.startsWith('__other::') && s === 'Other');
          return (
            <TouchableOpacity
              key={s}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => onToggle(s)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{i18n.t(s)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {otherSelected && (
        <TextInput
          placeholder={i18n.t('interests_other_placeholder')}
          style={styles.otherInput}
          onChangeText={(t) => onToggle(`__other::${t}`)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, marginTop: 12 },
  label: { color: '#374151', fontWeight: '600', marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: '#4F46E5' },
  chipText: { color: '#374151' },
  chipTextActive: { color: '#FFFFFF' },
  otherInput: { marginTop: 8, backgroundColor: '#fff', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#E6E7F2' },
});
