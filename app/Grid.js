import React from 'react';
import { FlatList, View } from 'react-native';
import Tile from './Tile';
import * as SERVICES from './services';

const Grid = ({ onEnter }) => {
  const data = Object.values(SERVICES);

  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({ item }) => (
        <Tile service={item} onEnter={onEnter} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Grid;
