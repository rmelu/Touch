import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Tile = ({ name, onPress }) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.name}>{name}</Text>
      <Button title="ENTRA" onPress={onPress} color="#0a6b45" />
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0a6b45',
    padding: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Tile;
