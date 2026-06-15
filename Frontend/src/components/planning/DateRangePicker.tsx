import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from '../../utils/i18n';

interface Props {
  visible?: boolean;
  inline?: boolean;
  initialStart?: string;
  initialEnd?: string;
  onCancel?: () => void;
  onConfirm: (start: string | null, end: string | null) => void;
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function DateRangePicker({ visible, inline = false, initialStart, initialEnd, onCancel, onConfirm }: Props) {
  const today = new Date();
  const [view, setView] = useState<Date>(startOfMonth(today));

  const initStart = initialStart ? new Date(initialStart) : null;
  const initEnd = initialEnd ? new Date(initialEnd) : null;

  const [start, setStart] = useState<Date | null>(initStart);
  const [end, setEnd] = useState<Date | null>(initEnd);

  const weeks = useMemo(() => {
    const first = startOfMonth(view);
    const firstWeekday = first.getDay();
    const total = daysInMonth(view);
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    const rows: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [view]);

  function onDayPress(day: number | null) {
    if (day === null) return;
    const dt = new Date(view.getFullYear(), view.getMonth(), day);
    if (!start || (start && end)) {
      setStart(dt);
      setEnd(null);
      return;
    }
    // start exists and end is null
    if (dt.getTime() < start.getTime()) {
      setStart(dt);
      setEnd(start);
      return;
    }
    setEnd(dt);
  }

  function isInRange(d: Date) {
    if (!start) return false;
    if (!end) return d.getTime() === start.getTime();
    return d.getTime() >= start.getTime() && d.getTime() <= end.getTime();
  }

  function fmt(d: Date) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  const nights = start && end ? Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const days = nights ? nights + 1 : start && !end ? 1 : 0;

     useEffect(() => {
      if (start && end) {
        onConfirm(fmt(start), fmt(end));
      }
    }, [start, end]);

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{i18n.t('plan_travel_dates_hint')}</Text>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}>
            <Text style={styles.nav}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{`${view.toLocaleString(undefined, { month: 'long' })} ${view.getFullYear()}`}</Text>
          <TouchableOpacity onPress={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}>
            <Text style={styles.nav}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekHeader}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w) => (
            <Text key={w} style={styles.weekDay}>{w}</Text>
          ))}
        </View>

        {weeks.map((row, ri) => (
          <View key={ri} style={styles.weekRow}>
            {row.map((d, ci) => {
              if (d === null) return <View key={ci} style={styles.dayCell} />;
              const cellDate = new Date(view.getFullYear(), view.getMonth(), d);
              const active = isInRange(cellDate);
              const isStart = start && cellDate.getTime() === start.getTime();
              const isEnd = end && cellDate.getTime() === end.getTime();
              return (
                <Pressable key={ci} style={[styles.dayCell, active && styles.dayCellActive, isStart && styles.dayCellStart, isEnd && styles.dayCellEnd]} onPress={() => onDayPress(d)}>
                  <Text style={[styles.dayText, (isStart || isEnd) && styles.dayTextActive]}>{d}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}

        <View style={styles.summaryRow}>
          <Text style={styles.summary}>{start ? `${i18n.t('plan_start_date')}: ${fmt(start)}` : `${i18n.t('plan_start_date')}: —`}</Text>
          <Text style={styles.summary}>{end ? `${i18n.t('plan_end_date')}: ${fmt(end)}` : `${i18n.t('plan_end_date')}: —`}</Text>
        </View>
        <Text style={styles.summarySmall}>{days > 0 ? `${days} ${i18n.t('days')} • ${nights} ${i18n.t('nights')}` : i18n.t('travel_dates')}</Text>
      </View>
    );



  
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.25)' },
label: { color: '#374151', fontWeight: '600', marginBottom: 8 },
  card: { backgroundColor: '#fff', padding: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  cardInline: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginHorizontal: 18 },
container: { paddingHorizontal: 18, marginTop: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  nav: { fontSize: 18, color: '#374151', paddingHorizontal: 12 },
  monthTitle: { fontSize: 16, fontWeight: '700' },
  weekHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  weekDay: { width: 36, textAlign: 'center', color: '#6B7280' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  dayCell: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18 },
  dayCellActive: { backgroundColor: '#E9EDFF' },
  dayCellStart: { backgroundColor: '#0B51F1' },
  dayCellEnd: { backgroundColor: '#0B51F1' },
  dayText: { color: '#111827' },
  dayTextActive: { color: '#fff', fontWeight: '700' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  summary: { color: '#374151' },
  summarySmall: { color: '#6B7280', marginTop: 6 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  actionBtn: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: '#F3F4F6', alignItems: 'center', marginRight: 8 },
  confirm: { backgroundColor: '#4F46E5', marginRight: 0 },
  actionText: { fontWeight: '700' },
});
