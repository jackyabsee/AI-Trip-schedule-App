import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ForumCard from './ForumCard';

interface Item {
  id: string;
  author: string;
  meta?: string;
  title: string;
  excerpt?: string;
  avatar?: any;
  image?: any;
}

interface Props {
  items: Item[];
  onPressItem?: (id: string) => void;
}

export default function ForumFeed({ items, onPressItem }: Props) {
  return (
    <FlatList
      data={items}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <ForumCard
          author={item.author}
          meta={item.meta}
          title={item.title}
          excerpt={item.excerpt}
          avatar={item.avatar}
          image={item.image}
          onPress={() => onPressItem?.(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
