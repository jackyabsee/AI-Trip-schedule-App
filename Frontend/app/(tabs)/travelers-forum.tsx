import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ForumSearchBar, ForumFeed } from '../../components/travelersForum';
import i18n from '../../utils/i18n';

const samplePosts = [
  {
    id: 'p1',
    author: 'Elena Rostova',
    meta: '2 hours ago • Trip Reviews',
    title: 'My Solo Trip to Bali: The Hidden Waterfalls',
    excerpt: "Just got back from an incredible 2-week journey across Bali...",
    image: require('../../assets/images/destination/Tokyo.jpg'),
  },
  {
    id: 'p2',
    author: 'Marcus Chen',
    meta: '5 hours ago • Travel Tips',
    title: 'Packing Light: 7 Days in a Carry-On',
    excerpt: 'I used to be a chronic overpacker. After losing my luggage in Rome...',
  },
  {
    id: 'p3',
    author: 'Sarah Jenkins',
    meta: '1 day ago • Meetups',
    title: 'Tokyo Explorers: Weekend Izakaya Crawl',
    excerpt: "Anyone in Tokyo this weekend? A few of us are planning an Izakaya crawl...",
  },
];

export default function TravelersForumScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerWrap}>
          <Text style={styles.title}>{i18n.t('forum_page_title')}</Text>
          <Text style={styles.subtitle}>{i18n.t('forum_page_subtitle')}</Text>
        </View>

        <View style={styles.searchWrap}>
          <ForumSearchBar placeholder={i18n.t('forum_search_placeholder')} />
        </View>

        <View style={styles.feedWrap}>
          <ForumFeed items={samplePosts} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8FD' },
  container: { padding: 18, paddingBottom: 24 },
  headerWrap: { marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800', color: '#111827' },
  subtitle: { marginTop: 6, color: '#6B7280' },
  searchWrap: { marginTop: 12 },
  feedWrap: { marginTop: 12 },
});
