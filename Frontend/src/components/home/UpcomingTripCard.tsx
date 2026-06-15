import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { UpcomingTrip } from './homeTypes';

interface UpcomingTripCardProps {
  trip: UpcomingTrip;
  onPressOpenItinerary?: () => void;
  onPressShare?: () => void;
}

export default function UpcomingTripCard({ trip, onPressOpenItinerary, onPressShare }: UpcomingTripCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Trip</Text>
      <Pressable style={styles.detailsLink} onPress={onPressOpenItinerary}>
        <Text style={styles.detailsLinkText}>View Details</Text>
      </Pressable>

      <View style={styles.card}>
        <ImageBackground source={trip.heroImage} style={styles.heroImage} imageStyle={styles.heroImageRadius}>
          <View style={styles.badge}>
            <Ionicons name="airplane-outline" size={14} color="#111827" />
            <Text style={styles.badgeText}>{trip.badge}</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Ionicons name="location-outline" size={22} color="#0B51F1" />
            <Text style={styles.tripTitle}>{trip.title}</Text>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={18} color="#4B5563" />
            <Text style={styles.metaText}>
              {trip.dateRange} <Text style={styles.dot}>•</Text> {trip.duration}
            </Text>
          </View>

          <View style={styles.splitRow}>
            <View style={styles.metricBlock}>
              <View style={styles.metricIconWrap}>
                <Ionicons name="bed-outline" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.metricTextWrap}>
                <Text style={styles.metricLabel}>{trip.accommodationLabel}</Text>
                <Text style={styles.metricValue}>{trip.accommodationValue}</Text>
              </View>
            </View>

            <View style={styles.metricBlock}>
              <View style={[styles.metricIconWrap, styles.flightIconWrap]}>
                <Ionicons name="airplane-outline" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.metricTextWrap}>
                <Text style={styles.metricLabel}>{trip.flightLabel}</Text>
                <Text style={styles.metricValue}>{trip.flightValue}</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerRow}>
            <Pressable style={styles.primaryButton} onPress={onPressOpenItinerary}>
              <Text style={styles.primaryButtonText}>Open Itinerary</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={onPressShare}>
              <Ionicons name="share-social-outline" size={22} color="#111827" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.4,
  },
  detailsLink: {
    position: 'absolute',
    right: 18,
    top: 40,
  },
  detailsLinkText: {
    fontSize: 16,
    color: '#0B51F1',
    fontWeight: '500',
  },
  card: {
    marginTop: 18,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7DBEA',
  },
  heroImage: {
    height: 220,
    justifyContent: 'flex-start',
    padding: 16,
  },
  heroImageRadius: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  badgeText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 18,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tripTitle: {
    flex: 1,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: '#111827',
  },
  metaRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 15,
    color: '#4B5563',
  },
  dot: {
    color: '#9CA3AF',
  },
  splitRow: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 12,
  },
  metricBlock: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  metricIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#0B51F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flightIconWrap: {
    backgroundColor: '#FF7A45',
  },
  metricTextWrap: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  metricValue: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#111827',
  },
  footerRow: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EF',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B51F1',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    width: 58,
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4FB',
    borderWidth: 1,
    borderColor: '#D8DDF0',
  },
});