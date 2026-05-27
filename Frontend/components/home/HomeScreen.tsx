import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HomeHeader from './HomeHeader';
import HomeSearchBar from './HomeSearchBar';
import UpcomingTripCard from './UpcomingTripCard';
import QuickActionGrid from './QuickActionGrid';
import InterestRail from './InterestRail';
import BottomNav from './BottomNav';
import { bottomNavItems, interestCards, quickActions, upcomingTrip } from './homeData';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <HomeHeader title="GenTrip" />

          <View style={styles.greetingBlock}>
            <Text style={styles.greeting}>Good morning, Alex.</Text>
            <Text style={styles.subGreeting}>Where to next?</Text>
          </View>

          <HomeSearchBar placeholder="Try 'A weekend in Tokyo' or 'Rome in spring'" />

          <UpcomingTripCard trip={upcomingTrip} />

          <QuickActionGrid actions={quickActions} />

          <InterestRail title="Explore Interests" interests={interestCards} />
        </ScrollView>

        <BottomNav items={bottomNavItems} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  root: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  scrollContent: {
    paddingBottom: 12,
  },
  greetingBlock: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.8,
    fontWeight: '800',
    color: '#111827',
  },
  subGreeting: {
    marginTop: 8,
    fontSize: 17,
    lineHeight: 22,
    color: '#2F3545',
    fontWeight: '500',
  },
});