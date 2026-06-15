import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { InterestCard } from './homeTypes';

interface InterestRailProps {
  title: string;
  interests: InterestCard[];
  onPressInterest?: (interest: InterestCard) => void;
}

export default function InterestRail({ title, interests, onPressInterest }: InterestRailProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Recommended for you</Text>
      </View>

      <FlatList
        data={interests}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => onPressInterest?.(item)}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.cardText}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingLeft: 18,
  },
  headerRow: {
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  listContent: {
    paddingRight: 18,
    gap: 12,
    paddingTop: 14,
  },
  card: {
    width: 118,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7DBEA',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 106,
    resizeMode: 'cover',
  },
  cardText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
});