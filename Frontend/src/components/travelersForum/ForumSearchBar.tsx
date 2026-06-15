import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  placeholder?: string;
}

export default function ForumSearchBar({ placeholder = 'Search topics, destinations...' }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput placeholder={placeholder} placeholderTextColor="#9CA3AF" style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E9F2',
    marginBottom: 12,
  },
  input: { flex: 1, fontSize: 16, color: '#111827' },
});
