import React from 'react';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import i18n from '../../utils/i18n';

export default function TravelersForumPreview() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{i18n.t('forum_preview_title')}</Text>
        <Link href="/travelers-forum" asChild>
          <Pressable style={styles.exploreButton}>
            <Text style={styles.exploreText}>{i18n.t('forum_explore_more') || i18n.t('forum_preview_title')}</Text>
          </Pressable>
        </Link>
      </View>

      <Pressable style={styles.card} onPress={() => {}}>
        <View style={styles.cardHeader}>
          <View style={styles.avatarPlaceholder}><Text style={styles.avatarLetter}>E</Text></View>
          <View style={styles.metaWrap}>
            <Text style={styles.author}>Elena Rostova</Text>
            <Text style={styles.meta}>2 hours ago • Trip Reviews</Text>
          </View>
        </View>
        <Text numberOfLines={2} style={styles.cardTitle}>My Solo Trip to Bali: The Hidden Waterfalls</Text>
        <Text numberOfLines={2} style={styles.cardExcerpt}>Just got back from an incredible 2-week journey across Bali. Instead of sticking to the usual spots...</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, marginTop: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: '#111827' },
  exploreButton: { paddingHorizontal: 10, paddingVertical: 6 },
  exploreText: { color: '#0B51F1', fontWeight: '700' },
  card: { marginTop: 12, borderRadius: 12, overflow: 'hidden', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6E9F2', padding: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E6EEF9', alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { color: '#0B51F1', fontWeight: '700' },
  metaWrap: { marginLeft: 10 },
  author: { fontSize: 14, fontWeight: '700', color: '#111827' },
  meta: { fontSize: 12, color: '#6B7280' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 },
  cardExcerpt: { fontSize: 14, color: '#4B5563' },
});
