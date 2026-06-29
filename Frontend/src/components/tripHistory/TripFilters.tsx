import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import i18n from '../../utils/i18n';

interface Props {
  selected: 'upcoming' | 'past';
  onChange: (v: 'upcoming' | 'past') => void;
}

export default function TripFilters({ selected, onChange }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={[styles.btn, selected === 'past' && styles.btnActive]} onPress={() => onChange('past')}>
        <Text style={[styles.text, selected === 'past' && styles.textActive]}>{i18n.t('home_nav_history') || 'Past'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, selected === 'upcoming' && styles.btnActive]} onPress={() => onChange('upcoming')}>
        <Text style={[styles.text, selected === 'upcoming' && styles.textActive]}>{i18n.t('home_recommended_for_you') || 'Upcoming'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingHorizontal: 18, gap: 12, marginBottom: 12 },
  btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#F3F4F6' },
  btnActive: { backgroundColor: '#0B51F1' },
  text: { color: '#374151', fontWeight: '600' },
  textActive: { color: '#fff' },
});
