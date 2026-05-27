import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import NewsCard from './NewsCard';

interface GridItem {
  id: string;
  title: string;
  subtitle?: string;
  image: any;
}

interface NewsGridProps {
  items: GridItem[];
  onPress?: (id: string) => void;
}

export default function NewsGrid({ items, onPress }: NewsGridProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <NewsCard title={item.title} subtitle={item.subtitle} image={item.image} onPress={() => onPress?.(item.id)} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 18, paddingLeft: 18 },
});
