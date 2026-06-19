// src/components/schedule/ScheduleTimeline.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScheduleItem } from '../../types';

interface Props {
  schedule: ScheduleItem[];
  editable?: boolean;
  onChange?: (s: ScheduleItem[]) => void;
}

export default function ScheduleTimeline({ schedule, editable = false, onChange }: Props) {
  const handleFieldChange = (index: number, key: keyof ScheduleItem, value: string | number) => {
    const copy = [...schedule];
    // @ts-ignore
    copy[index][key] = value;
    onChange && onChange(copy);
  };

  const handleDelete = (index: number) => {
    const copy = [...schedule];
    copy.splice(index, 1);
    onChange && onChange(copy);
  };

  const handleAdd = () => {
    const copy = [...schedule];
    copy.push({
      time: '12:00',
      placeName: '',
      address: '',
      activities: '',
      notes: ''
    } as ScheduleItem);
    onChange && onChange(copy);
  };

  return (
    <View style={styles.root}>
      {schedule.map((s, idx) => (
        <View key={idx} style={styles.item}>
          <View style={styles.timeWrap}>
            {editable ? (
              <TextInput value={s.time} onChangeText={(t) => handleFieldChange(idx, 'time', t)} style={styles.timeInput} />
            ) : (
              <Text style={styles.time}>{s.time}</Text>
            )}
          </View>
          <View style={styles.card}>
            {editable ? (
              <>
                <TextInput value={s.placeName} onChangeText={(t) => handleFieldChange(idx, 'placeName', t)} style={styles.placeInput} placeholder="Place Name" />
                <TextInput value={s.address} onChangeText={(t) => handleFieldChange(idx, 'address', t)} style={styles.addressInput} placeholder="Address" />
                <TextInput value={s.activities} onChangeText={(t) => handleFieldChange(idx, 'activities', t)} style={styles.activitiesInput} multiline placeholder="Activities" />
                <TextInput value={s.notes || ''} onChangeText={(t) => handleFieldChange(idx, 'notes', t)} style={styles.notesInput} placeholder="Notes" />
                <TouchableOpacity onPress={() => handleDelete(idx)} style={styles.deleteBtn}>
                  <Text style={{ color: '#ef4444', fontWeight: '600' }}>Delete Activity</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.place}>{s.placeName}</Text>
                {s.address ? <Text style={styles.address}>{s.address}</Text> : null}
                <Text style={styles.activities}>{s.activities}</Text>
                {s.notes ? <Text style={styles.notes}>{s.notes}</Text> : null}
              </>
            )}
          </View>
        </View>
      ))}

      {editable && (
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>+ Add New Place</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 40 },
  item: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' },
  timeWrap: { width: 72, alignItems: 'flex-start' },
  time: { color: '#6B7280' },
  timeInput: { color: '#111827', paddingVertical: 4, fontWeight: '600', backgroundColor: '#F3F4F6', borderRadius: 6, paddingHorizontal: 8, width: 60 },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.06, elevation: 2 },
  place: { fontSize: 16, fontWeight: '700', color: '#111827' },
  placeInput: { fontSize: 16, fontWeight: '700', color: '#111827', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  address: { marginTop: 6, color: '#6B7280' },
  addressInput: { marginTop: 6, color: '#6B7280', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  activities: { marginTop: 8, color: '#374151' },
  activitiesInput: { marginTop: 8, color: '#374151', minHeight: 40, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  notes: { marginTop: 8, color: '#9CA3AF', fontSize: 13 },
  notesInput: { marginTop: 8, color: '#9CA3AF', fontSize: 13, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  deleteBtn: { marginTop: 12, alignSelf: 'flex-end', padding: 4 },
  addBtn: { marginTop: 12, marginLeft: 72, backgroundColor: '#EEF2FF', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  addBtnText: { color: '#0B51F1', fontWeight: '700' }
});