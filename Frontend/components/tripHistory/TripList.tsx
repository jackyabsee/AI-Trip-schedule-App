import React from 'react';
import { View } from 'react-native';
import TripCard from './TripCard';

interface Trip {
  id: string;
  title: string;
  dateRange: string;
  activities: string;
  image?: string;
  badge?: string;
}

interface Props {
  trips: Trip[];
}

export default function TripList({ trips }: Props) {
  return (
    <View>
      {trips.map((t) => (
        <TripCard key={t.id} title={t.title} dateRange={t.dateRange} activities={t.activities} image={t.image} badge={t.badge} />
      ))}
    </View>
  );
}
