import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { QuickAction } from './homeTypes';

interface QuickActionGridProps {
  actions: QuickAction[];
  onPressAction?: (action: QuickAction) => void;
}

function renderIcon(action: QuickAction, color: string) {
  if (action.iconLibrary === 'Feather') {
    return <Feather name={action.iconName as React.ComponentProps<typeof Feather>['name']} size={28} color={color} />;
  }

  if (action.iconLibrary === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        name={action.iconName as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
        size={28}
        color={color}
      />
    );
  }

  return <Ionicons name={action.iconName as React.ComponentProps<typeof Ionicons>['name']} size={28} color={color} />;
}

export default function QuickActionGrid({ actions, onPressAction }: QuickActionGridProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={actions}
        scrollEnabled={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => onPressAction?.(item)}>
            <View style={[styles.iconWrap, { backgroundColor: item.backgroundColor }]}>
              {renderIcon(item, item.accentColor)}
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    marginTop: 32,
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    minHeight: 122,
    borderRadius: 18,
    backgroundColor: '#F7F8FD',
    borderWidth: 1,
    borderColor: '#D7DBEA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 14,
  },
  iconWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    lineHeight: 22,
    color: '#111827',
    textAlign: 'center',
  },
});