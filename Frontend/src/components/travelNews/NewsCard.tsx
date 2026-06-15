import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface NewsCardProps {
  title: string;
  subtitle?: string;
  image: any;
  onPress?: () => void;
}

export default function NewsCard({ title, subtitle, image, onPress }: NewsCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.body}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        {subtitle ? <Text numberOfLines={2} style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E9F2',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  body: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
});
