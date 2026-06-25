import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import{SafeAreaView} from 'react-native-safe-area-context';
import HomeSearchBar from '../../components/home/HomeSearchBar';
import TripFilters from '../../components/tripHistory/TripFilters';
import TripList from '../../components/tripHistory/TripList';
// 加入 useRouter 以支援導航
import { useRouter, useSearchParams as _useSearchParams } from 'expo-router';
import ScheduleTable from '../../components/ScheduleTable';
import { fetchScheduleById } from '../../services/api';
import { ScheduleItem } from '../../types';
import { fetchSchedules } from '../../services/supabaseApi';
import { getCurrentUser } from '../../services/supabaseAuth';

export default function ScheduleScreen() {
  const [mode, setMode] = useState<'upcoming' | 'past'>('upcoming');
  const router = useRouter(); // 實例化 router

  // Some expo-router builds may not expose `useSearchParams` on web; provide a safe fallback
  const useSearchParams = typeof _useSearchParams === 'function'
    ? _useSearchParams
    : () => {
        if (typeof window !== 'undefined') {
          const sp = new URLSearchParams(window.location.search);
          const obj: Record<string, string> = {};
          sp.forEach((v, k) => { obj[k] = v; });
          return obj;
        }
        return {} as Record<string, string>;
      };

  const { scheduleId, generated } = useSearchParams();
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const emptyTripsNote = 'No saved trips yet. Generate a schedule to save and view it here.';

  useEffect(() => {
    if (generated) {
      try {
        const parsed = JSON.parse(generated as string);
        setSchedule(parsed.schedule || []);
      } catch (err) {
        // ignore
      }
      return;
    }

    if (scheduleId) {
      setLoading(true);
      fetchScheduleById(String(scheduleId))
        .then((res) => {
          const s =
            res?.payload?.schedule ||
            res?.schedule ||
            res?.payload?.payload?.schedule ||
            res?.payload?.deepseekResponse?.schedule ||
            res?.payload?.response?.schedule ||
            res?.payload?.deepseekResponse?.data?.schedule;
          setSchedule(s || []);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [scheduleId, generated]);

  useEffect(() => {
    if (mode !== 'past') return;
    let mounted = true;
    (async () => {
      setLoadingHistory(true);
      try {
        const userRes = await getCurrentUser();
        const user = (userRes as any)?.data?.user;
        if (!user?.id) {
          setTrips([]);
          return;
        }
        const rows = await fetchSchedules(user.id);
        if (!mounted) return;
        const mapped = (rows || []).map((r: any) => {
          const deep = r?.payload?.deepseekResponse || r?.payload || {};
          const summary = deep?.summary || '';
          const start = r?.start_date ? new Date(r.start_date).toLocaleDateString() : '';
          const end = r?.end_date ? new Date(r.end_date).toLocaleDateString() : '';
          
          return {
            id: String(r.id),
            // 修改這裡：優先讀取資料庫的 title (使用者自訂的名稱)，若無則讀取目的地的預設名稱
            title: r.title || deep?.title || r.destination || (summary.split('\n')?.[0] || '我的旅程'),
            dateRange: start && end ? `${start} - ${end}` : (start || end || ''),
            activities: summary || `${(deep?.schedule?.length || 0)} activities`,
            image: (deep?.hotels && deep.hotels[0]?.bookingUrl) || undefined,
            raw: r,
          };
        });
        setTrips(mapped);
      } catch (err) {
        setTrips([]);
      } finally {
        setLoadingHistory(false);
      }
    })();
    return () => { mounted = false; };
  }, [mode]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <HomeSearchBar placeholder="Search your trips..." />
          <TripFilters selected={mode} onChange={setMode} />
          {mode === 'past' ? (
            loadingHistory ? (
              <Text>Loading history...</Text>
            ) : trips.length ? (
              // 修改這裡：把 onItemPress 加回去，確保點擊後可以導覽至行程詳細頁面
              <TripList 
                trips={trips} 
                onItemPress={(trip) => router.push({ pathname: '/(tabs)/schedule-detail', params: { scheduleId: trip.id } })}
              />
            ) : (
              <View style={{ padding: 18 }}>
                <Text style={{ color: '#6B7280' }}>{emptyTripsNote}</Text>
              </View>
            )
          ) : (
            schedule ? (
              <>
                {loading ? <Text>Loading schedule...</Text> : <ScheduleTable schedule={schedule} />}
              </>
            ) : (
              <View style={{ padding: 18 }}>
                <Text style={{ color: '#6B7280' }}>No schedule selected. Generate a schedule to view details.</Text>
              </View>
            )
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8FD' },
  root: { flex: 1, backgroundColor: '#F7F8FD' },
  content: { paddingBottom: 30, paddingTop: 8 },
});