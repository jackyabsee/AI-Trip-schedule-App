import React from 'react';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import i18n from '../../utils/i18n';

export default function TravelNewsPreview() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{i18n.t('travel_news_preview_title')}</Text>
        <Link href="/travel-news" asChild>
          <Pressable style={styles.exploreButton}>
            <Text style={styles.exploreText}>{i18n.t('travel_news_explore_more')}</Text>
          </Pressable>
        </Link>
      </View>

      <Pressable style={styles.card} onPress={() => {}}>
        <Image source={require('../../assets/images/destination/Tokyo.jpg')} style={styles.image} />
        <View style={styles.cardBody}>
          <Text numberOfLines={2} style={styles.cardTitle}>{i18n.t('travel_news_preview_title')}</Text>
          <Text numberOfLines={2} style={styles.cardSubtitle}>{i18n.t('travel_news_preview_subtitle')}</Text>
        </View>
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
  card: { marginTop: 12, borderRadius: 12, overflow: 'hidden', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6E9F2' },
  image: { width: '100%', height: 140, resizeMode: 'cover' },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  cardSubtitle: { fontSize: 13, color: '#6B7280', marginTop: 6 },
});
