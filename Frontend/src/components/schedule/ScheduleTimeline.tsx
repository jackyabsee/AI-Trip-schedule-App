// src/components/schedule/ScheduleTimeline.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScheduleItem } from '../../types';
import i18n from '../../utils/i18n';

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
      price:0,
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
                <TextInput value={s.placeName} onChangeText={(t) => handleFieldChange(idx, 'placeName', t)} style={styles.placeInput} placeholder={i18n.t('place_name')} />
                <TextInput value={s.address} onChangeText={(t) => handleFieldChange(idx, 'address', t)} style={styles.addressInput} placeholder={i18n.t('address')} />
                <TextInput 
                  value={s.price !== undefined ? String(s.price) : ''} 
                  onChangeText={(t) => handleFieldChange(idx, 'price', Number(t) || 0)} 
                  style={styles.priceInput} 
                  placeholder={i18n.t('estimated_cost')} 
                  keyboardType="numeric" 
                />
                <TextInput value={s.activities} onChangeText={(t) => handleFieldChange(idx, 'activities', t)} style={styles.activitiesInput} multiline placeholder={i18n.t('activities')} />
                <TextInput value={s.notes || ''} onChangeText={(t) => handleFieldChange(idx, 'notes', t)} style={styles.notesInput} placeholder={i18n.t('notes')} />
                <TouchableOpacity onPress={() => handleDelete(idx)} style={styles.deleteBtn}>
                  <Text style={{ color: '#ef4444', fontWeight: '600' }}>{i18n.t('delete_activity')}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.place}>{s.placeName}</Text>
                {s.address ? <Text style={styles.address}>{s.address}</Text> : null}
                {s.price !== undefined ? (
                  <Text style={styles.priceBadge}>
                    {i18n.t('price')}: {s.price === 0 ? i18n.t('free') : s.price}
                  </Text>
                ) : null}
                <Text style={styles.activities}>{s.activities}</Text>
                {s.notes ? <Text style={styles.notes}>{s.notes}</Text> : null}
              </>
            )}
          </View>
        </View>
      ))}

      {editable && (
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>+ {i18n.t('add_new_place')}</Text>
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
  priceBadge: { marginTop: 6, color: '#0B51F1', fontSize: 13, fontWeight: '600' },
  priceInput: { marginTop: 6, color: '#0B51F1', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#F3F4F6', fontWeight: '600' },
  activities: { marginTop: 8, color: '#374151' },
  activitiesInput: { marginTop: 8, color: '#374151', minHeight: 40, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  notes: { marginTop: 8, color: '#9CA3AF', fontSize: 13 },
  notesInput: { marginTop: 8, color: '#9CA3AF', fontSize: 13, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  deleteBtn: { marginTop: 12, alignSelf: 'flex-end', padding: 4 },
  addBtn: { marginTop: 12, marginLeft: 72, backgroundColor: '#EEF2FF', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  addBtnText: { color: '#0B51F1', fontWeight: '700' }
});