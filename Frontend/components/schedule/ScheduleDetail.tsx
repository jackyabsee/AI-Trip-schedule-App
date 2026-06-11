// app/(tabs)/schedule-detail.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, View, Text } from 'react-native';
import { useRouter, useLocalSearchParams, useSearchParams as _useSearchParams } from 'expo-router';
import ScheduleDetail from '../../components/schedule/ScheduleDetail';
import { fetchScheduleById } from '../../services/api';

export default function ScheduleDetailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [rowId, setRowId] = useState<number | null>(null);

  // useLocalSearchParams is the recommended approach for newer Expo Router versions
  const params = typeof useLocalSearchParams === 'function' ? useLocalSearchParams() : _useSearchParams();
  const scheduleId = params?.scheduleId as string | undefined;
  const generated = params?.generated as string | undefined;

  useEffect(() => {
    (async () => {
      // 1. Reset loading state when new params arrive
      setLoading(true); 
      
      try {
        if (generated) {
          const parsed = JSON.parse(generated);
          setData(parsed);
        } else if (scheduleId) {
          const res = await fetchScheduleById(String(scheduleId));
          // server returns the stored row; extract deepseekResponse but remember row id for updates
          const deep = res?.payload?.deepseekResponse || res?.deepseekResponse || res;
          setData(deep);
          setRowId(res?.id ?? null);
        } else {
          // If navigated without params, clear data
          setData(null); 
        }
      } catch (err) {
        // ignore
        console.error("Error parsing schedule:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [scheduleId, generated]); // 2. Add dependencies here!

  if (loading) return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color="#0B51F1" /></SafeAreaView>;
  if (!data) return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>No schedule data</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScheduleDetail
        title={data?.title || data?.destination}
        startDate={data?.startDate || data?.start_date}
        endDate={data?.endDate || data?.end_date}
        numTourists={data?.numTourists}
        summary={data?.summary}
        schedule={data?.schedule}
        hotels={data?.hotels}
        persistedId={rowId}
      />
    </SafeAreaView>
  );
}