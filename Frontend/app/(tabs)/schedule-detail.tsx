import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ScheduleDetail from '../../components/schedule/ScheduleDetail';
import { fetchScheduleById } from '../../services/api';

export default function ScheduleDetailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // read search params directly
    const sp = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const scheduleId = sp.get('scheduleId');
    const generated = sp.get('generated');

    (async () => {
      try {
        if (generated) {
          const parsed = JSON.parse(generated);
          setData(parsed);
        } else if (scheduleId) {
          const res = await fetchScheduleById(String(scheduleId));
          // server returns row with payload.deepseekResponse
          const deep = res?.payload?.deepseekResponse || res?.deepseekResponse || res;
          setData(deep);
        }
      } catch (err) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></SafeAreaView>;
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
      />
    </SafeAreaView>
  );
}
