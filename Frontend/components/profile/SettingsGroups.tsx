import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import i18n from '../../utils/i18n';

export default function SettingsGroups() {
  return (
    <View>
      <View style={styles.group}>
        <View style={styles.header}><Text style={styles.headerTitle}>App Settings</Text></View>
        <TouchableOpacity style={styles.row}><Text>Notifications</Text></TouchableOpacity>
        <TouchableOpacity style={styles.row}><Text>Currency Choice</Text></TouchableOpacity>
        <TouchableOpacity style={styles.row}><Text>Location Services</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { backgroundColor: '#FFFFFF', borderRadius: 12, marginHorizontal: 18, padding: 12, marginTop: 12, borderWidth: 1, borderColor: '#EEF2FF' },
  header: { marginBottom: 8 },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  row: { paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  rowActive: { backgroundColor: '#F0F6FF' },
});
