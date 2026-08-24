// src/components/home/UpcomingTripCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../../utils/i18n';

interface Props {
  title: string;
  dateRange: string;
  destination: string;
  imageUrl?: string;
  onPress: () => void;
  isSuggested?: boolean;
}

export default function UpcomingTripCard({ title, dateRange, destination, imageUrl, onPress, isSuggested }: Props) {
  // Default placeholder image if the AI didn't provide a hotel image
  const displayImage = imageUrl || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: displayImage }} style={styles.image} />
      
      {/* Badge for Suggested Trips */}
      {isSuggested && (
        <View style={styles.suggestedBadge}>
          <Text style={styles.suggestedText}>{i18n.t('home_suggested_badge')}</Text>
        </View>
      )}

      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.destination}>{destination}</Text>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={16} color="#E5E7EB" />
            <Text style={styles.date}>{dateRange}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { height: 200, borderRadius: 16, overflow: 'hidden', marginHorizontal: 18, marginBottom: 24, backgroundColor: '#E5E7EB' },
  image: { width: '100%', height: '100%', position: 'absolute' },
  suggestedBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(11, 81, 241, 0.9)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  suggestedText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
  content: { padding: 16 },
  destination: { color: '#E5E7EB', fontSize: 13, fontWeight: '600', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  date: { color: '#E5E7EB', fontSize: 14, fontWeight: '500' }
});