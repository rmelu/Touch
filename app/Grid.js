import React from 'react';
import { FlatList } from 'react-native';
import Tile from './Tile';
import SERVICES from './services';

export default function Grid({ onEnter }) {
  return (
    <FlatList
      data={SERVICES}
      numColumns={2}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Tile name={item.name} onPress={() => onEnter(item)} />
      )}
    />
  );
}