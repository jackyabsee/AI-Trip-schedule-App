import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Hero, QuickInspiration, NewsGrid } from '../../components/travelNews';
import i18n from '../../utils/i18n';

const sampleItems = [
  {
    id: '1',
    title: 'The Ultimate Iceland Expedition',
    subtitle: 'Discover hidden geothermal pools and massive glaciers',
    image: require('../../assets/images/destination/Tokyo.jpg'),
  },
  {
    id: '2',
    title: 'Kyoto Autumn',
    subtitle: 'Temple walks and vibrant foliage',
    image: require('../../assets/images/destination/Osaka.jpg'),
  },
  {
    id: '3',
    title: 'Coastal Italy',
    subtitle: 'Cinque Terre and Mediterranean views',
    image: require('../../assets/images/destination/Fukuoka.jpg'),
  },
];

export default function TravelNewsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Hero title={i18n.t('travel_news_preview_title')} subtitle={i18n.t('travel_news_preview_subtitle')} image={sampleItems[0].image} />

        <View style={styles.section}>
          <QuickInspiration items={sampleItems} />
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>{i18n.t('travel_news_featured_section')}</Text>
          <NewsGrid items={sampleItems} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8FD' },
  container: { paddingBottom: 24 },
  section: { marginTop: 18 },
  heading: { fontSize: 20, fontWeight: '700', color: '#111827', paddingLeft: 18, marginBottom: 8 },
});
