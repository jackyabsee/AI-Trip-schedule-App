import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, View, Text } from 'react-native';
import { useRouter, useLocalSearchParams, useSearchParams as _useSearchParams } from 'expo-router';
import ScheduleDetail from '../../components/schedule/ScheduleDetail';
import { fetchScheduleById } from '../../services/api';

// 1. Import the store
import { useScheduleStore } from '../../store/useScheduleStore';

export default function ScheduleDetailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [rowId, setRowId] = useState<number | null>(null);

  // Grab the data from memory
  const generatedData = useScheduleStore((state) => state.generatedData);

  const params = typeof useLocalSearchParams === 'function' ? useLocalSearchParams() : _useSearchParams();
  const scheduleId = params?.scheduleId as string | undefined;
  
  // Look for the flag we passed in the router
  const isGenerated = params?.isGenerated === 'true';

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (isGenerated && generatedData) {
          // 2. Safely pull the massive object directly from Zustand
          setData(generatedData);
        } else if (scheduleId) {
          const res = await fetchScheduleById(String(scheduleId));
          const deep = res?.payload?.deepseekResponse || res?.deepseekResponse || res;
          setData(deep);
          setRowId(res?.id ?? null);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error("Error loading schedule data", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [scheduleId, isGenerated, generatedData]);

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