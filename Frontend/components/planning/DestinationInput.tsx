import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import i18n from '../../utils/i18n';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function DestinationInput({ value, onChange, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n.t('destination')}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || i18n.t('plan_places_to_visit_placeholder')}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, marginTop: 12 },
  label: { color: '#374151', fontWeight: '600', marginBottom: 8 },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E6E7F2',
  },
});
