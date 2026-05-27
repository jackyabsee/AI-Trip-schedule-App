import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomNavItem } from './homeTypes';

interface BottomNavProps {
  items: BottomNavItem[];
  onPressItem?: (item: BottomNavItem) => void;
}

function renderIcon(item: BottomNavItem, isActive: boolean) {
  const color = isActive ? '#FFFFFF' : '#2F3545';

  if (item.iconLibrary === 'Feather') {
    return <Feather name={item.iconName as React.ComponentProps<typeof Feather>['name']} size={24} color={color} />;
  }

  if (item.iconLibrary === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        name={item.iconName as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
        size={24}
        color={color}
      />
    );
  }

  return <Ionicons name={item.iconName as React.ComponentProps<typeof Ionicons>['name']} size={24} color={color} />;
}

export default function BottomNav({ items, onPressItem }: BottomNavProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = Boolean(item.active);
        return (
          <Pressable key={item.id} style={styles.item} onPress={() => onPressItem?.(item)}>
            <View style={[styles.iconBubble, isActive ? styles.iconBubbleActive : styles.iconBubbleInactive]}>
              {renderIcon(item, isActive)}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EF',
  },
  item: {
    alignItems: 'center',
    gap: 6,
    minWidth: 66,
  },
  iconBubble: {
    width: 68,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubbleActive: {
    backgroundColor: '#0B51F1',
  },
  iconBubbleInactive: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 12,
    color: '#2F3545',
    fontWeight: '500',
  },
  labelActive: {
    color: '#0B51F1',
    fontWeight: '700',
  },
});