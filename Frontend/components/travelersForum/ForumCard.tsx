import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface ForumCardProps {
  avatar?: any;
  author: string;
  meta?: string;
  title: string;
  excerpt?: string;
  image?: any;
  onPress?: () => void;
}

export default function ForumCard({ avatar, author, meta, title, excerpt, image, onPress }: ForumCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        {avatar ? <Image source={avatar} style={styles.avatar} /> : <View style={styles.avatarPlaceholder}><Text style={styles.avatarLetter}>{author?.[0]}</Text></View>}
        <View style={styles.metaWrap}>
          <Text style={styles.author}>{author}</Text>
          {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      {excerpt ? <Text numberOfLines={3} style={styles.excerpt}>{excerpt}</Text> : null}

      {image ? <Image source={image} style={styles.image} /> : null}

      <View style={styles.footer}>
        <Text style={styles.actions}>❤️ 0</Text>
        <Text style={styles.actions}>💬 0</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E6E9F2',
    marginBottom: 12,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E6EEF9', alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { color: '#0B51F1', fontWeight: '700' },
  metaWrap: {},
  author: { fontSize: 14, fontWeight: '700', color: '#111827' },
  meta: { fontSize: 12, color: '#6B7280' },
  title: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 },
  excerpt: { fontSize: 14, color: '#4B5563', marginBottom: 8 },
  image: { width: '100%', height: 160, borderRadius: 8, marginTop: 8 },
  footer: { flexDirection: 'row', gap: 14, marginTop: 8 },
  actions: { color: '#6B7280', fontWeight: '600' },
});
