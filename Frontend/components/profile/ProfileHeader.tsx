import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import i18n from '../../utils/i18n';

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0WgXdFAcifb68crnvOLOUcKYrxXeeQBUupqvDTMNmmQ2V-GHld0RVYPKAltstflTcLXRDR7ujkXX9gi2xNx172T1dWR71FaRvthqVoIbE8am2_u8FWPshLOGR5wsjP2mN-yJgc6iiLRrIz32rtjCuQK0wDgGYeyY9BtFC8FNRlQcc-cnbiYbEQbX6uvoXg-3PFeckCEfPsBw-r6vhtyKAVS9QMqsWev9BUciXSHhMmVMmS4bMfzr4Z_x07ThoERuhifxkzWUiHwzF' }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>Alex Thompson</Text>
        <Text style={styles.subtitle}>{i18n.t('membership')?.replace('{tier}', 'Premium')}</Text>
        <View style={styles.badges}>
          <View style={styles.badge}><Text style={styles.badgeText}>Explorer Level 4</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFEDD5' }]}><Text style={[styles.badgeText, { color: '#7A2E0E' }]}>Beta Tester</Text></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 18, backgroundColor: '#FFFFFF', borderRadius: 12, marginHorizontal: 18, marginTop: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  avatar: { width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: '#E8EEFF' },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 18, fontWeight: '800', color: '#111827' },
  subtitle: { marginTop: 4, color: '#6B7280' },
  badges: { flexDirection: 'row', marginTop: 8, gap: 8 },
  badge: { backgroundColor: '#EEF2FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 18 },
  badgeText: { color: '#0B51F1', fontWeight: '700' },
});
