import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import i18n from '../../utils/i18n';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SpecificPlacesInput({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n.t('plan_places_to_visit')}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={i18n.t('plan_places_to_visit_placeholder')}
        placeholderTextColor="#9CA3AF"
        style={[styles.input, { height: 80 }]}
        multiline
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
    textAlignVertical: 'top',
  },
});
