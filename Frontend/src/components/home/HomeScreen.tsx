import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeSearchBar from './HomeSearchBar';
import UpcomingTripCard from './UpcomingTripCard';
import QuickActionGrid from './QuickActionGrid';
import InterestRail from './InterestRail';
import TravelNewsPreview from './TravelNewsPreview';
import TravelersForumPreview from './TravelersForumPreview';
import { interestCards, quickActions, upcomingTrip } from './homeData';
import i18n, { subscribeLanguageChange } from '../../utils/i18n';
import { useAuthStore } from '../../store/useAuthStore';

export default function HomeScreen() {
  const [, setLang] = useState<string>(i18n.locale || 'zh-TW');
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    const unsub = subscribeLanguageChange((lng) => setLang(lng));
    return unsub;
  }, []);

  const greeting = i18n.t('home_greeting');
  const subGreeting = i18n.t('home_sub_greeting');
  const searchPlaceholder = i18n.t('home_search_placeholder');
  const emailPrefix = user?.email?.split('@')[0] || '';
  const displayName = user?.user_metadata?.full_name || emailPrefix;
  const personalizedGreeting = displayName ? `${greeting} ${displayName}` : greeting;
  
  const localizedTrip = {
    ...upcomingTrip,
    badge: i18n.t('home_upcoming_badge'),
    title: i18n.t('home_upcoming_title'),
    dateRange: i18n.t('home_upcoming_date_range'),
    duration: i18n.t('home_upcoming_duration'),
    accommodationLabel: i18n.t('home_upcoming_accommodation_label'),
    accommodationValue: i18n.t('home_upcoming_accommodation_value'),
    flightLabel: i18n.t('home_upcoming_flight_label'),
    flightValue: i18n.t('home_upcoming_flight_value'),
  };

  const actionLabelKey: Record<string, string> = {
    plan: 'home_action_plan_new_trip',
    saved: 'home_action_saved_trips',
    map: 'home_action_map_explore',
    language: 'home_action_language',
  };

  const localizedActions = quickActions.map((a) => ({ ...a, label: i18n.t(actionLabelKey[a.id] ?? a.label) }));

  const localizedInterests = interestCards.map((c) => ({ ...c, title: i18n.t(c.id) }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.greetingBlock}>
            <Text style={styles.greeting}>{personalizedGreeting}</Text>
            <Text style={styles.subGreeting}>{subGreeting}</Text>
          </View>

          <HomeSearchBar placeholder={searchPlaceholder} />

          <UpcomingTripCard trip={localizedTrip} />

          <QuickActionGrid actions={localizedActions} />

          {/* Travel news preview section */}
          <TravelNewsPreview />

          {/* Travelers forum preview */}
          <TravelersForumPreview />

          <InterestRail title={i18n.t('home_explore_interests')} interests={localizedInterests} />
        </ScrollView>
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