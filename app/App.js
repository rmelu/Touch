import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication';
import Grid from './Grid';
import ServiceScreen from './ServiceScreen';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [selected, setSelected] = useState(null);

  const unlock = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      setUnlocked(result.success);
    } catch (error) {
      setUnlocked(false);
    }
  };

  useEffect(() => {
    unlock();
  }, []);

  const handleSelectService = (service) => setSelected(service);

  if (!unlocked) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>DITO</Text>
        <Text style={styles.subtitle}>Accesso Bloccato</Text>
        <Button title="Sblocca con Impronta" onPress={unlock} />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DITO</Text>
        <Button title="Blocca" onPress={() => { setUnlocked(false); setSelected(null); }} />
      </View>

      {!selected ? (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Seleziona un servizio</Text>
          <Grid onEnter={handleSelectService} />
        </View>
      ) : (
        <ServiceScreen service={selected} onBack={() => setSelected(null)} />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0a6b45' },
  subtitle: { fontSize: 18, marginBottom: 20 },
  content: { flex: 1, paddingHorizontal: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15, textAlign: 'center' },
});