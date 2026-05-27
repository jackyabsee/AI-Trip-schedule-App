import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  dateRange: string;
  activities: string;
  image?: string;
  badge?: string;
}

export default function TripCard({ title, dateRange, activities, image, badge }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: image }} style={styles.image} />
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.more}>⋯</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaIcon}>📅</Text>
          <Text style={styles.metaText}>{dateRange}</Text>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.metaRow}>
            <Text style={styles.metaIcon}>🗒️</Text>
            <Text style={styles.metaText}>{activities}</Text>
          </View>
          <View style={styles.avatars}>
            <View style={[styles.avatar, { backgroundColor: '#FEE2E2' }]}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View style={[styles.avatar, { backgroundColor: '#EDE9FE', marginLeft: -8 }]}>
              <Text style={styles.avatarText}>G</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden', marginBottom: 14, marginHorizontal: 18, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, elevation: 3 },
  imageWrap: { height: 160, backgroundColor: '#EEE' },
  image: { width: '100%', height: '100%' },
  badge: { position: 'absolute', top: 10, left: 10, backgroundColor: '#FEE2E2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#7A1F1F', fontWeight: '700', fontSize: 12 },
  body: { padding: 12 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  more: { color: '#0B51F1', fontSize: 20 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  metaIcon: { marginRight: 8 },
  metaText: { color: '#6B7280' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 },
  avatars: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  avatarText: { fontSize: 12, fontWeight: '700' },
});
