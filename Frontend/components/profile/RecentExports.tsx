import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MOCK = [
  { id: '1', name: 'Tokyo Spring Itinerary', date: '2024-02-12' },
  { id: '2', name: 'Kyoto Weekend', date: '2024-01-28' },
];

export default function RecentExports() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Exported</Text>
      <FlatList data={MOCK} keyExtractor={(i) => i.id} renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 18, marginTop: 12, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#EEF2FF' },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  item: { paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  itemTitle: { fontWeight: '700' },
  itemDate: { color: '#6B7280', marginTop: 4 },
});
