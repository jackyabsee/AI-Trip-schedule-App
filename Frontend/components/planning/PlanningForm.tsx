import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import DestinationInput from './DestinationInput';
import DateRangePicker from './DateRangePicker';
import TravelersPicker from './TravelersPicker';
import InterestsSelector from './InterestsSelector';
import BudgetInput from './BudgetInput';
import StartingPlaceInput from './StartingPlaceInput';
import SpecificPlacesInput from './SpecificPlacesInput';
import OptionSelector from './OptionSelector';
import { useRouter } from 'expo-router';
import i18n from '../../utils/i18n';
import { UserInput } from '../../types';
import { generateSchedule } from '../../services/api';


export default function PlanningForm() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [startingPlace, setStartingPlace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numTourists, setNumTourists] = useState(2);
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [placesToVisit, setPlacesToVisit] = useState('');
  const [accommodation, setAccommodation] = useState<string[]>([]);
  const [travelStyle, setTravelStyle] = useState<string[]>([]);

  function toggleInterest(id: string) {
    setInterests((s) => {
      if (id.startsWith('__other::')) return [...s.filter((x) => !x.startsWith('__other::')), id];
      if (s.includes(id)) return s.filter((x) => x !== id);
      return [...s, id];
    });
  }

  function toggleGeneric(arr: string[], setter: (v: string[]) => void, id: string) {
    if (id.startsWith('__other::')) {
      const v = id.split('::')[1] || '';
      setter([...arr.filter((x) => !x.startsWith('__other::')), `__other::${v}`]);
      return;
    }
    if (arr.includes(id)) setter(arr.filter((x) => x !== id));
    else setter([...arr, id]);
  }

  function computeDuration(s: string, e: string) {
    try {
      const sd = new Date(s);
      const ed = new Date(e);
      const diff = Math.ceil((ed.getTime() - sd.getTime()) / (1000 * 60 * 60 * 24));
      return Math.max(0, diff || 0);
    } catch {
      return 0;
    }
  }

  const onSubmit = () => {
    const duration = computeDuration(startDate, endDate);
    const input: UserInput = {
      budget: Number(budget) || 0,
      startDate,
      endDate,
      duration,
      travelCompanions: '',
      destination,
      travelStyle: travelStyle.map((s) => (s.startsWith('__other::') ? s.split('::')[1] : s)),
      interests: interests.map((s) => (s.startsWith('__other::') ? s.split('::')[1] : s)),
      dining: [],
      accommodation: accommodation.map((s) => (s.startsWith('__other::') ? s.split('::')[1] : s)),
      numTourists,
      language: i18n.locale,
    };
    setLoading(true);
    setError('');
    generateSchedule(input)
      .then((res) => {
        const id = res?.id;
        if (id) {
          router.push({ pathname: '/(tabs)/schedule-detail', params: { scheduleId: String(id) } });
        } else if (res?.schedule || res?.summary) {
          router.push({ pathname: '/(tabs)/schedule-detail', params: { generated: JSON.stringify({ schedule: res.schedule || res?.payload?.schedule, hotels: res.hotels || res?.payload?.hotels, summary: res.summary || res?.payload?.summary, destination: input.destination, startDate: input.startDate, endDate: input.endDate, numTourists: input.numTourists }) } });
        } else {
          setError('Failed to generate schedule');
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Generate schedule error', err?.response?.data ?? err?.message ?? err);
        const msg = err?.response?.data?.error || err?.message || 'Failed to generate schedule';
        setError(msg);
      })
      .finally(() => setLoading(false));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{i18n.t('plan_title')}</Text>
          <Text style={styles.subtitle}>{i18n.t('plan_subtitle')}</Text>

          <StartingPlaceInput value={startingPlace} onChange={setStartingPlace} />
          <DestinationInput value={destination} onChange={setDestination} />
          <DateRangePicker
            inline
            initialStart={startDate || undefined}
            initialEnd={endDate || undefined}
            onConfirm={(s, e) => {
              if (s) setStartDate(s);
              if (e) setEndDate(e);
            }}
          />
          <TravelersPicker value={numTourists} onChange={setNumTourists} />
          <BudgetInput value={budget} onChange={setBudget} />
          <SpecificPlacesInput value={placesToVisit} onChange={setPlacesToVisit} />
          <InterestsSelector selected={interests} onToggle={toggleInterest} />

          <OptionSelector
            labelKey={'accommodation'}
            options={[ 'ryokan', 'hotel', 'hostel', 'resort', 'Other' ]}
            selected={accommodation}
            onToggle={(id) => toggleGeneric(accommodation, setAccommodation, id)}
          />

          <OptionSelector
            labelKey={'travelStyle'}
            options={[ 'leisure', 'packed', 'romantic', 'adventure', 'family_fun', 'Other' ]}
            selected={travelStyle}
            onToggle={(id) => toggleGeneric(travelStyle, setTravelStyle, id)}
          />

          <TouchableOpacity style={styles.cta} onPress={onSubmit} disabled={loading}>
            <Text style={styles.ctaText}>{loading ? i18n.t('generating') || 'Generating...' : i18n.t('generate_schedule')}</Text>
          </TouchableOpacity>

          {error ? <Text style={{ color: 'red', paddingHorizontal: 18, marginTop: 8 }}>{error}</Text> : null}

          <Text style={styles.footer}>{i18n.t('plan_footer_text')}</Text>
        </ScrollView>
      </View>
      {loading && (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>{i18n.t('ai_generating') || 'AI is generating your schedule...'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8FD' },
  root: { flex: 1, backgroundColor: '#F7F8FD' },
  content: { paddingBottom: 30, paddingTop: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#111827', paddingHorizontal: 18 },
  subtitle: { paddingHorizontal: 18, marginTop: 8, color: '#374151', fontSize: 15 },
  cta: {
    marginTop: 18,
    marginHorizontal: 18,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  footer: { marginTop: 12, color: '#6B7280', paddingHorizontal: 18, fontSize: 13 },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  loadingText: { marginTop: 12, color: '#fff', fontSize: 16 },
});
