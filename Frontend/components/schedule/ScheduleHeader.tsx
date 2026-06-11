import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title?: string;
  startDate?: string;
  endDate?: string;
  numTourists?: number;
  summary?: string;
}

export default function ScheduleHeader({ title, startDate, endDate, numTourists, summary }: Props) {
  const dateRange = startDate && endDate ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}` : '';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Trip'}</Text>
      <Text style={styles.meta}>{dateRange}{numTourists ? ` • ${numTourists} Travelers` : ''}</Text>
      {summary ? <Text style={styles.summary}>{summary}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 18, marginTop: 12 },
  title: { fontSize: 20, fontWeight: '700', color: '#111827' },
  meta: { marginTop: 6, color: '#6B7280' },
  summary: { marginTop: 10, color: '#374151' },
});
