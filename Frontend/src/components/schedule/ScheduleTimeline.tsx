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
                <TextInput value={s.placeName} onChangeText={(t) => handleFieldChange(idx, 'placeName', t)} style={styles.placeInput} />
                <TextInput value={s.address} onChangeText={(t) => handleFieldChange(idx, 'address', t)} style={styles.addressInput} />
                <TextInput value={s.activities} onChangeText={(t) => handleFieldChange(idx, 'activities', t)} style={styles.activitiesInput} multiline />
                <TextInput value={s.notes || ''} onChangeText={(t) => handleFieldChange(idx, 'notes', t)} style={styles.notesInput} />
                <TouchableOpacity onPress={() => handleDelete(idx)} style={styles.deleteBtn}><Text style={{ color: '#ef4444' }}>Delete</Text></TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.place}>{s.placeName}</Text>
                <Text style={styles.address}>{s.address}</Text>
                <Text style={styles.activities}>{s.activities}</Text>
                {s.notes ? <Text style={styles.notes}>{s.notes}</Text> : null}
              </>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 40 },
  item: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' },
  timeWrap: { width: 72, alignItems: 'flex-start' },
  time: { color: '#6B7280' },
  timeInput: { color: '#6B7280', paddingVertical: 4 },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.06, elevation: 2 },
  place: { fontSize: 16, fontWeight: '700', color: '#111827' },
  placeInput: { fontSize: 16, fontWeight: '700', color: '#111827', paddingVertical: 4 },
  address: { marginTop: 6, color: '#6B7280' },
  addressInput: { marginTop: 6, color: '#6B7280', paddingVertical: 4 },
  activities: { marginTop: 8, color: '#374151' },
  activitiesInput: { marginTop: 8, color: '#374151', minHeight: 40 },
  notes: { marginTop: 8, color: '#9CA3AF', fontSize: 13 },
  notesInput: { marginTop: 8, color: '#9CA3AF', fontSize: 13, paddingVertical: 4 },
  deleteBtn: { marginTop: 8, alignSelf: 'flex-end' },
});
