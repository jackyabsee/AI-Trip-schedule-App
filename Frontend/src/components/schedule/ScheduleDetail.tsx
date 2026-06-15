// components/schedule/ScheduleDetail.tsx
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ScheduleHeader from './ScheduleHeader';
import ScheduleTimeline from './ScheduleTimeline';
import { ScheduleItem } from '../../types';

interface Props {
  title?: string;
  startDate?: string;
  endDate?: string;
  numTourists?: number;
  summary?: string;
  schedule?: ScheduleItem[];
  hotels?: any[];
  persistedId?: number | null;
}

export default function ScheduleDetail({
  title, startDate, endDate, numTourists, summary, schedule
}: Props) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScheduleHeader
        title={title}
        startDate={startDate}
        endDate={endDate}
        numTourists={numTourists}
        summary={summary}
      />
      {schedule && schedule.length > 0 && (
        <ScheduleTimeline schedule={schedule} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FD' }
});