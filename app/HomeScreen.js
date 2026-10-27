import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.grid}>
        <View style={styles.tile}>
          <Text>Netflix</Text>
          <Text>ENTRA</Text>
        </View>
        <View style={styles.tile}>
          <Text>Gmail</Text>
          <Text>ENTRA</Text>
        </View>
        <View style={styles.tile}>
          <Text>Amazon</Text>
          <Text>ENTRA</Text>
        </View>
        <View style={styles.tile}>
          <Text>Disney+</Text>
          <Text>ENTRA</Text>
        </View>
        <View style={styles.tile}>
          <Text>Instagram</Text>
          <Text>ENTRA</Text>
        </View>
        <View style={styles.tile}>
          <Text>PayPal</Text>
          <Text>ENTRA</Text>
        </View>
        <View style={styles.tile}>
          <Text>Spotify</Text>
          <Text>ENTRA</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  tile: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, margin: 8, width: '45%' },
});

export default HomeScreen;
