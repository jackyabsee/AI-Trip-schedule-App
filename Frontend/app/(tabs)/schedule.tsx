import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import HomeSearchBar from '../../components/home/HomeSearchBar';
import TripFilters from '../../components/tripHistory/TripFilters';
import TripList from '../../components/tripHistory/TripList';

const MOCK = [
  {
    id: 'tokyo',
    title: '3 Days in Tokyo',
    dateRange: 'Oct 12 - Oct 14',
    activities: '12 Activities',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA35ZastUNalLepKAFeuGEugXgverQZ0hSq83gev4fpp9KyRC2Jc3bhLbXxH9-ktPfc99he2Tds5oNoawN33b-Zzihoysrt9pxxWyTxPk2_ijLkuMdgYs3hgR9B5HYa0yyTMuK4il6dUF3LsJzZMlZcSlR8_TX6a--bCmpdTo3ovLwBYbDJG-Ouikae2AFx05ir8XAL42e8iVB9Z7MhdzbG-KyWzgkTKsRsdDgP9guXDxzjyZWHl4W7gvc7vsOLgj8NwuMsHDRcKliw',
    badge: 'Shared',
  },
  {
    id: 'paris',
    title: 'Parisian Romance',
    dateRange: 'Nov 02 - Nov 08',
    activities: '24 Activities',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAaxz1qZ29JwsdfeG_QOqcCwt5N0OJELdb4hcnz9XpaNgcTXs1wAcp4ulQwWMT1UxZ-Uz1patgkosvqK-Ncjx8i7qFk0fNFLGNHM-8AQotObCM2Cmtip_RzpqOmhNdrO_ghsyxBu8_18jir_Ovw8ud1TXDCGdPi9BRE4hDThwhGH74YS3VKa9F-GB29YXgVku13H7mOiWSPsiGzx0wTAlBv2cMmK6xKbFmzykQ0MHQePjM9Hg3-0sa9E-2rETdmOLheyO0ZUcAKPFs',
    badge: 'Exported',
  },
  {
    id: 'nyc',
    title: 'NYC Winter Break',
    dateRange: 'Dec 20 - Dec 27',
    activities: '18 Activities',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVFmhm8utOrgNPLJd3Gk0IqfHFh-CacnSE2KqSPXIdV3r9YhQUBcOQ-sUBhh5VHDwvrWBlW2kCKKP36arDlgf2r2KuoF7C8GvwwcM7cIJ1fW8tplNsZ8T8qPb1rGgq8MQEpcZ0D5nyP0h1muPme6-yty6kgkWLLjbi8qrMhYbttaH_JVUI36T-EQIxNRRvBPMn5LBvfw6c5HiPlbpAf6ChH9OsHW52geiVBZk566YBCors5RS7oag4KVq_YkWJ_075hIFpqNv8ECKS',
  },
];

export default function ScheduleScreen() {
  const [mode, setMode] = useState<'upcoming' | 'past'>('upcoming');

  const trips = MOCK; // In future, filter by mode

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <HomeSearchBar placeholder="Search your trips..." />
          <TripFilters selected={mode} onChange={setMode} />
          <TripList trips={trips} />
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