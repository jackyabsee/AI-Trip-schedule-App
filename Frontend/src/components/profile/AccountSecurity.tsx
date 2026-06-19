// src/components/profile/AccountSecurity.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../configs/supabase';
import { useAuthStore } from '../../store/useAuthStore';

export default function AccountSecurity() {
  const user = useAuthStore((state) => state.user);
  
  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'name' | 'password'>('name');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const openModal = (mode: 'name' | 'password') => {
    setModalMode(mode);
    setInputValue('');
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!inputValue.trim()) {
      Alert.alert('Error', 'Input cannot be empty.');
      return;
    }
    
    setLoading(true);
    let error;

    if (modalMode === 'name') {
      const res = await supabase.auth.updateUser({ data: { full_name: inputValue } });
      error = res.error;
    } else {
      const res = await supabase.auth.updateUser({ password: inputValue });
      error = res.error;
    }

    setLoading(false);

    if (error) {
      Alert.alert('Update Failed', error.message);
    } else {
      Alert.alert('Success', `Your ${modalMode} has been updated.`);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings & Security</Text>
      
      <TouchableOpacity style={styles.row} onPress={() => openModal('name')}>
        <Text style={styles.rowText}>Edit Display Name</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.row} onPress={() => openModal('password')}>
        <Text style={styles.rowText}>Change Password</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.row}>
        <Text style={styles.rowText}>Two-Factor Authentication</Text>
      </TouchableOpacity>

      {/* Reusable Input Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalMode === 'name' ? 'Update Display Name' : 'New Password'}
            </Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder={modalMode === 'name' ? 'Enter new name' : 'Enter new password'}
              value={inputValue}
              onChangeText={setInputValue}
              secureTextEntry={modalMode === 'password'}
              autoCapitalize={modalMode === 'name' ? 'words' : 'none'}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 18, marginTop: 12, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#EEF2FF' },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#111827' },
  row: { paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  rowText: { color: '#374151', fontSize: 15 },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 24 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#111827' },
  modalInput: { borderWidth: 1, borderColor: '#D7DBEA', borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', gap: 12 },
  cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 10, alignItems: 'center', backgroundColor: '#F3F4F6' },
  cancelBtnText: { color: '#4B5563', fontWeight: '600', fontSize: 16 },
  saveBtn: { flex: 1, paddingVertical: 14, borderRadius: 10, alignItems: 'center', backgroundColor: '#0B51F1' },
  saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});