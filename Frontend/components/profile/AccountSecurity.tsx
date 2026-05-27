import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AccountSecurity() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Security</Text>
      <TouchableOpacity style={styles.row}><Text>Change Password</Text></TouchableOpacity>
      <TouchableOpacity style={styles.row}><Text>Two-Factor Authentication</Text></TouchableOpacity>
      <TouchableOpacity style={styles.row}><Text>Manage Connected Apps</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 18, marginTop: 12, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#EEF2FF' },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  row: { paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
});
