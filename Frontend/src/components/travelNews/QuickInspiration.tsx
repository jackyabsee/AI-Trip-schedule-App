import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import NewsCard from './NewsCard';

interface QuickInspirationProps {
  items: { id: string; title: string; subtitle?: string; image: any }[];
  onPress?: (id: string) => void;
}

export default function QuickInspiration({ items, onPress }: QuickInspirationProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quick Inspiration</Text>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            onPress={() => onPress?.(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 18, paddingLeft: 18 },
  heading: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 10 },
});
