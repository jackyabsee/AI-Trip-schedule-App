import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

interface HomeHeaderProps {
  title: string;
  onPressCompass?: () => void;
  onPressAdd?: () => void;
}

export default function HomeHeader({ title, onPressCompass, onPressAdd }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressCompass} hitSlop={10} style={styles.iconButton}>
        <Feather name="compass" size={22} color="#111827" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onPressAdd} hitSlop={10} style={styles.iconButton}>
        <Ionicons name="add-circle-outline" size={28} color="#111827" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconButton: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: '#0B51F1',
    letterSpacing: -0.5,
  },
});