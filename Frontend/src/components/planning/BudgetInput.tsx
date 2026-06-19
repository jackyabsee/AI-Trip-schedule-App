import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Modal, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import i18n from '../../utils/i18n';

interface Props {
  value: string;
  onChange: (v: string) => void;
  currency: string;
  onCurrencyChange: (v: string) => void;
}

const CURRENCIES = ['USD', 'HKD', 'JPY', 'EUR', 'GBP', 'AUD', 'CAD'];

export default function BudgetInput({ value, onChange, currency, onCurrencyChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n.t('budget')}</Text>
      <View style={styles.inputRow}>
        <View style={styles.pickerContainer}>
          {Platform.OS === 'web' ? (
            <select
              value={currency}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onCurrencyChange(e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                borderWidth: 0,
                backgroundColor: 'transparent',
                color: '#111827',
                paddingLeft: 12,
              }}
            >
              {CURRENCIES.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          ) : (
            <NativeModalPicker currency={currency} onCurrencyChange={onCurrencyChange} />
          )}
        </View>
        <TextInput
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
          placeholder={i18n.t('enter_budget')}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, marginTop: 12 },
  label: { color: '#374151', fontWeight: '600', marginBottom: 8 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pickerContainer: {
    width: 110,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E7F2',
    height: 48,
    justifyContent: 'center',
    overflow: Platform.OS === 'web' ? 'hidden' : 'visible',
  },
  picker: {
    width: '100%',
    height: 48,
    backgroundColor: 'transparent',
    color: '#111827',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E6E7F2',
  },
  nativeTrigger: {
    paddingLeft: 12,
    height: 48,
    justifyContent: 'center',
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#fff', padding: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: '50%' },
  modalItem: { paddingVertical: 14, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  modalItemText: { fontSize: 16 },
});

function NativeModalPicker({ currency, onCurrencyChange }: { currency: string; onCurrencyChange: (v: string) => void }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)} style={styles.nativeTrigger}>
        <Text style={{ color: '#111827', fontWeight: '600' }}>{currency} ▾</Text>
      </Pressable>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <ScrollView>
              {CURRENCIES.map((cur) => (
                <Pressable
                  key={cur}
                  onPress={() => { onCurrencyChange(cur); setVisible(false); }}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemText}>{cur}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}