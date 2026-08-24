import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { fetchSuggestedTrip, fetchUserUpcomingTrip } from '@/src/services/supabaseApi';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [, setLang] = useState<string>(i18n.locale || 'zh-TW');
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    const unsub = subscribeLanguageChange((lng) => setLang(lng));
    return unsub;
  }, []);
  const router = useRouter();
  // State for dynamic trip
  const [tripData, setTripData] = useState<any>(null);
  const [isSuggested, setIsSuggested] = useState(false);
  const [loading, setLoading] = useState(true);

  const greeting = i18n.t('home_greeting');
  const subGreeting = i18n.t('home_sub_greeting');
  const searchPlaceholder = i18n.t('home_search_placeholder');
  const emailPrefix = user?.email?.split('@')[0] || '';
  const displayName = user?.user_metadata?.full_name || emailPrefix;
  const personalizedGreeting = displayName ? `${greeting} ${displayName}` : greeting;
  

  const actionLabelKey: Record<string, string> = {
    plan: 'home_action_plan_new_trip',
    saved: 'home_action_saved_trips',
    map: 'home_action_map_explore',
    language: 'home_action_language',
  };

  const localizedActions = quickActions.map((a) => ({ ...a, label: i18n.t(actionLabelKey[a.id] ?? a.label) }));

  const localizedInterests = interestCards.map((c) => ({ ...c, title: i18n.t(c.id) }));

  useEffect(() => {
    let mounted = true;
    
    const loadDynamicTrip = async () => {
      setLoading(true);
      try {
        let targetTrip = null;
        
        // 1. If logged in, try to get their personal upcoming trip
        if (user?.id) {
          targetTrip = await fetchUserUpcomingTrip(user.id);
        }

        // 2. If no personal trip found (or not logged in), fetch the suggested template
        if (!targetTrip && mounted) {
          targetTrip = await fetchSuggestedTrip();
          setIsSuggested(true);
        } else {
          setIsSuggested(false);
        }

        if (mounted) setTripData(targetTrip);
      } catch (error) {
        console.error("Error loading home trip:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadDynamicTrip();
    return () => { mounted = false; };
  }, [user]);

  const handleTripPress = () => {
    if (tripData?.id) {
      router.push({ pathname: '/(tabs)/schedule-detail', params: { scheduleId: tripData.id } });
    }
  };

  // Format dates for the card
  const formatDateRange = (start?: string, end?: string) => {
    if (!start || !end) return i18n.t('tbd') || 'Dates TBD';
    return `${new Date(start).toLocaleDateString()} - ${new Date(end).toLocaleDateString()}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.greetingBlock}>
            <Text style={styles.greeting}>{personalizedGreeting}</Text>
            <Text style={styles.subGreeting}>{subGreeting}</Text>
          </View>

          <HomeSearchBar placeholder={searchPlaceholder} />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {isSuggested ? i18n.t('home_suggested_badge') : i18n.t('home_upcoming_trip')}
            </Text>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0B51F1" style={{ marginVertical: 40 }} />
          ) : tripData ? (
            <UpcomingTripCard 
              title={tripData.title || tripData.destination || 'My Trip'}
              destination={tripData.destination || 'World'}
              dateRange={formatDateRange(tripData.start_date, tripData.end_date)}
              imageUrl={tripData.payload?.hotels?.[0]?.bookingUrl} // You can map a real image URL here if available
              isSuggested={isSuggested}
              onPress={handleTripPress}
            />
          ) : (
             // Absolute fallback if DB is entirely empty
            <Text style={{ marginHorizontal: 18, color: '#6B7280' }}>No trips available right now.</Text>
          )}

          {/* <UpcomingTripCard trip={localizedTrip} /> */}

          <QuickActionGrid actions={localizedActions} />

          {/* Travel news preview section
          <TravelNewsPreview /> */}

          {/* Travelers forum preview */}
          {/* <TravelersForumPreview /> */}

          {/* <InterestRail title={i18n.t('home_explore_interests')} interests={localizedInterests} /> */}
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
  sectionHeader: { paddingHorizontal: 18, marginBottom: 12, marginTop: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' }
});