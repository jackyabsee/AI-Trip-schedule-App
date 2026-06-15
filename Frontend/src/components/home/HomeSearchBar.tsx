import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HomeSearchBarProps {
  placeholder: string;
  onPressAction?: () => void;
}

export default function HomeSearchBar({ placeholder, onPressAction }: HomeSearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputShell}>
        <Ionicons name="search" size={22} color="#7C8397" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#7C8397"
          style={styles.input}
          editable={false}
        />
        <Pressable onPress={onPressAction} hitSlop={10} style={styles.actionButton}>
          <Ionicons name="sparkles" size={22} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    marginTop: 18,
  },
  inputShell: {
    minHeight: 76,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CBD2E7',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#8B95B2',
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 0,
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B51F1',
  },
});