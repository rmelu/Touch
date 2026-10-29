import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system/legacy'; // se hai SDK < 54 usa 'expo-file-system'
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication';
import Grid from './Grid';
import ServiceScreen from './ServiceScreen';
import IntrudersScreen from './IntrudersScreen';

const MAX_AGE_DAYS = 7; // dopo quanti giorni le foto si cancellano da sole

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showIntruders, setShowIntruders] = useState(false);
  const cameraRef = useRef(null);
  const cameraReady = useRef(false);
  const [permission, requestPermission] = useCameraPermissions();

  // cancella le foto più vecchie di MAX_AGE_DAYS
  const cleanOldIntruders = async () => {
    try {
      const dir = FileSystem.documentDirectory + 'intruders/';
      const info = await FileSystem.getInfoAsync(dir);
      if (!info.exists) return;
      const files = await FileSystem.readDirectoryAsync(dir);
      const limit = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
      for (const f of files) {
        const ts = Number(f.replace('.jpg', ''));
        if (!isNaN(ts) && ts < limit) {
          await FileSystem.deleteAsync(dir + f, { idempotent: true });
        }
      }
    } catch (e) {}
  };

  const captureIntruder = async () => {
    try {
      // aspetta fino a 2 secondi che la camera sia pronta
      for (let i = 0; i < 20 && !cameraReady.current; i++) {
        await new Promise((r) => setTimeout(r, 100));
      }
      if (!cameraRef.current || !cameraReady.current) return;
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5, skipProcessing: true });
      const dir = FileSystem.documentDirectory + 'intruders/';
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
      await FileSystem.moveAsync({ from: photo.uri, to: dir + Date.now() + '.jpg' });
    } catch (e) {}
  };

  const unlock = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (!result.success) await captureIntruder();
      setUnlocked(result.success);
    } catch (error) {
      setUnlocked(false);
    }
  };

  useEffect(() => {
    (async () => {
      await cleanOldIntruders();
      await requestPermission();
      unlock();
    })();
  }, []);

  const handleSelectService = (service) => setSelected(service);

  if (!unlocked) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>DITO</Text>
        <Text style={styles.subtitle}>Accesso Bloccato</Text>
        <Button title="Sblocca con Impronta" onPress={unlock} />
        {permission?.granted && (
          <CameraView
            ref={cameraRef}
            facing="front"
            style={{ width: 1, height: 1, opacity: 0 }}
            onCameraReady={() => { cameraReady.current = true; }}
          />
        )}
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DITO</Text>
        <Button
          title="Blocca"
          onPress={() => {
            cameraReady.current = false;
            setUnlocked(false);
            setSelected(null);
            setShowIntruders(false);
          }}
        />
      </View>

      {showIntruders ? (
        <IntrudersScreen onBack={() => setShowIntruders(false)} />
      ) : !selected ? (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Seleziona un servizio</Text>
          <Button title="Tentativi di accesso" onPress={() => setShowIntruders(true)} />
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