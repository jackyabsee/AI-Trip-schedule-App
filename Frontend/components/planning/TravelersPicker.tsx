import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import i18n from '../../utils/i18n';

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export default function TravelersPicker({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n.t('num_tourists')}</Text>
      <View style={styles.row}>
        <TouchableOpacity testID="dec" style={styles.button} onPress={() => onChange(Math.max(1, value - 1))}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.countBox}>
          <Text style={styles.count}>{String(value)}</Text>
        </View>
        <TouchableOpacity testID="inc" style={styles.button} onPress={() => onChange(value + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, marginTop: 12 },
  label: { color: '#374151', fontWeight: '600', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center' },
  button: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: 20, color: '#1F2937' },
  countBox: { flex: 1, alignItems: 'center' },
  count: { fontSize: 18, fontWeight: '600' },
});
