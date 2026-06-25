// src/components/schedule/DayMap.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { ScheduleItem } from '../../types';
import i18n from '../../utils/i18n';
interface Props {
  schedule: ScheduleItem[];
}

export default function DayMap({ schedule }: Props) {
  const mapRef = useRef<MapView>(null);

  // Filter out activities that don't have valid coordinates (like transportation time or AI hallucinations)
  const validLocations = schedule.filter(s => s.latitude && s.longitude);

  // Re-center map when the day's schedule changes
  useEffect(() => {
    if (validLocations.length > 0 && mapRef.current) {
      const coordinates = validLocations.map(s => ({
        latitude: Number(s.latitude),
        longitude: Number(s.longitude)
      }));
      
      // Automatically zoom to fit all markers with some padding
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [schedule]);

  if (validLocations.length === 0) {
    return null; // Don't show map if no valid coordinates exist for this day
  }

  const coordinates = validLocations.map(s => ({
    latitude: Number(s.latitude),
    longitude: Number(s.longitude)
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('daily_route_map')}</Text>
      <View style={styles.mapContainer}>
        <MapView 
          ref={mapRef}
          style={styles.map} 
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Draw the connecting line */}
          <Polyline 
            coordinates={coordinates} 
            strokeColor="#0B51F1" 
            strokeWidth={4} 
            lineDashPattern={[1]} // Optional: makes the line dashed
          />
          
          {/* Draw the pins */}
          {validLocations.map((loc, idx) => (
            <Marker
              key={idx}
              coordinate={{ latitude: Number(loc.latitude), longitude: Number(loc.longitude) }}
              title={`${idx + 1}. ${loc.placeName}`}
              description={loc.time}
            >
              {/* Custom Numbered Marker */}
              <View style={styles.markerBadge}>
                <Text style={styles.markerText}>{idx + 1}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, paddingHorizontal: 18, paddingBottom: 40 },
  title: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  mapContainer: {
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E6E9F2',
  },
  map: { width: '100%', height: '100%' },
  markerBadge: {
    backgroundColor: '#0B51F1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});