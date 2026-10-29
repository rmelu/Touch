import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy'; // se hai SDK < 54 usa 'expo-file-system'

export default function IntrudersScreen({ onBack }) {
  const [intruders, setIntruders] = useState([]);

  const intrudersDir = `${FileSystem.documentDirectory}intruders/`;

  useEffect(() => {
    loadIntruderPhotos();
  }, []);

  const loadIntruderPhotos = async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(intrudersDir);
      if (!dirInfo.exists) {
        setIntruders([]);
        return;
      }

      const files = await FileSystem.readDirectoryAsync(intrudersDir);

      const photos = files
        .filter((file) => file.endsWith('.jpg') || file.endsWith('.png'))
        .map((file) => {
          const timestamp = Number(file.replace('.jpg', '').replace('.png', ''));
          const date = new Date(timestamp);
          return {
            uri: `${intrudersDir}${file}`,
            name: file,
            timestamp,
            date: isNaN(date.getTime()) ? 'Data sconosciuta' : date.toLocaleString(),
          };
        })
        .sort((a, b) => b.timestamp - a.timestamp); // dalle più recenti

      setIntruders(photos);
    } catch (error) {
      console.error('Errore nel caricamento delle foto intrusi:', error);
    }
  };

  const deleteOne = (item) => {
    Alert.alert('Elimina foto', 'Vuoi eliminare questa foto?', [
      { text: 'Annulla', style: 'cancel' },
      {
        text: 'Elimina',
        style: 'destructive',
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(item.uri, { idempotent: true });
          } catch (e) {}
          loadIntruderPhotos();
        },
      },
    ]);
  };

  const deleteAll = () => {
    Alert.alert('Elimina tutte', 'Vuoi eliminare tutte le foto?', [
      { text: 'Annulla', style: 'cancel' },
      {
        text: 'Elimina tutte',
        style: 'destructive',
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(intrudersDir, { idempotent: true });
          } catch (e) {}
          loadIntruderPhotos();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentativi di Accesso Rilevati</Text>

      {intruders.length === 0 ? (
        <Text style={styles.noIntruders}>Nessun intruso rilevato finora.</Text>
      ) : (
        <FlatList
          data={intruders}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.uri }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.dateText}>Tentativo del:</Text>
                <Text style={styles.dateValue}>{item.date}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteOne(item)}>
                <Text style={styles.deleteButtonText}>Elimina</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {intruders.length > 0 && (
        <TouchableOpacity style={styles.deleteAllButton} onPress={deleteAll}>
          <Text style={styles.backButtonText}>Elimina tutte</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Torna indietro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  noIntruders: { textAlign: 'center', color: '#666', marginTop: 40, fontSize: 16 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 15, alignItems: 'center', elevation: 2 },
  image: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#ddd' },
  infoContainer: { marginLeft: 15, flex: 1 },
  dateText: { fontSize: 12, color: '#888' },
  dateValue: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  deleteButton: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#c62828', borderRadius: 6 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  deleteAllButton: { marginTop: 10, padding: 12, backgroundColor: '#c62828', borderRadius: 6, alignItems: 'center' },
  backButton: { marginTop: 10, padding: 12, backgroundColor: '#2e7d32', borderRadius: 6, alignItems: 'center' },
  backButtonText: { color: '#fff', fontWeight: 'bold' },
});