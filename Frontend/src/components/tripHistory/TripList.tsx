import React from 'react';
import { View } from 'react-native';
import TripCard from './TripCard';

interface Trip {
  id: string;
  title: string;
  dateRange?: string;
  activities?: string;
  image?: string;
  badge?: string;
}

interface Props {
  trips: Trip[];
  compact?: boolean;
  onItemPress?: (trip: Trip) => void;
}

export default function TripList({ trips, compact = false, onItemPress }: Props) {
  return (
    <View>
      {trips.map((t) => (
        <TripCard
          key={t.id}
          title={t.title}
          dateRange={t.dateRange}
          activities={t.activities}
          image={t.image}
          badge={t.badge}
          compact={compact}
          onPress={() => onItemPress && onItemPress(t)}
        />
      ))}
    </View>
  );
}
