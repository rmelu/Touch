import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';

const KEY = 'dito_entries';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [entries, setEntries] = useState([]);
  const [visibleId, setVisibleId] = useState(null);
  const [site, setSite] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const load = async () => {
    const raw = await SecureStore.getItemAsync(KEY);
    setEntries(raw ? JSON.parse(raw) : []);
  };

  const unlock = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Appoggia il dito',
      });
      setUnlocked(result.success);
      if (result.success) {
        await load();
        setScreen('home');
      }
    } catch (error) {
      setUnlocked(false);
    }
  };

  const [screen, setScreen] = useState('lock');

  useEffect(() => {
    unlock();
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'lock':
        return (
          <View style={styles.center}>
            <Text style={styles.title}>DITO</Text>
            <Text style={styles.hint}>Appoggia il dito per entrare</Text>
            <Button title="Riprova" onPress={unlock} />
            <StatusBar style="auto" />
          </View>
        );
      case 'home':
        return <HomeScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

  const persist = async (list) => {
    await SecureStore.setItemAsync(KEY, JSON.stringify(list));
    setEntries(list);
  };

  const add = async () => {
    if (!site || !email || !password) {
      Alert.alert('Compila tutti i campi');
      return;
    }
    const entry = { id: Date.now().toString(), site, email, password };
    await persist([...entries, entry]);
    setSite('');
    setEmail('');
    setPassword('');
  };

  const remove = (id) => {
    Alert.alert('Eliminare?', 'Vuoi eliminare questa password?', [
      { text: 'Annulla', style: 'cancel' },
      {
        text: 'Elimina',
        style: 'destructive',
        onPress: () => persist(entries.filter((e) => e.id !== id)),
      },
    ]);
  };

  const copy = async (pw) => {
    await Clipboard.setStringAsync(pw);
    Alert.alert('Copiata', "Ora incolla la password nell'app che stai aprendo.");
  };

  const lock = () => {
    setUnlocked(false);
    setEntries([]);
    setVisibleId(null);
  };

  if (!unlocked) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>DITO</Text>
        <Text style={styles.hint}>Appoggia il dito per entrare</Text>
        <Button title="Riprova" onPress={unlock} />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>DITO</Text>

      <Text style={styles.section}>Le tue password ({entries.length})</Text>
      {entries.length === 0 && <Text style={styles.hint}>Ancora nessuna. Aggiungine una qui sotto.</Text>}

      {entries.map((e) => (
        <View key={e.id} style={styles.card}>
          <Text style={styles.cardTitle}>{e.site}</Text>
          <Text>{e.email}</Text>
          <Text style={styles.pw}>{visibleId === e.id ? e.password : '••••••••'}</Text>
          <View style={styles.row}>
            <Button title={visibleId === e.id ? 'Nascondi' : 'Mostra'} onPress={() => setVisibleId(visibleId === e.id ? null : e.id)} />
            <Button title="Copia" onPress={() => copy(e.password)} />
            <Button title="Elimina" color="#b00020" onPress={() => remove(e.id)} />
          </View>
        </View>
      ))}

      <Text style={styles.section}>Aggiungi una password</Text>
      <Text style={styles.label}>Nome del sito o dell'app</Text>
      <TextInput style={styles.input} placeholder="es. Vodafone" value={site} onChangeText={setSite} />
      <Text style={styles.label}>Email o nome utente</Text>
      <TextInput style={styles.input} placeholder="es. nome@gmail.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="la password di quel sito" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />

      <Button title="Salva" onPress={add} />
      <View style={{ height: 16 }} />
      <Button title="Blocca" onPress={lock} />
      <View style={{ height: 40 }} />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 24 },
  container: { backgroundColor: '#fff', padding: 24, paddingTop: 60 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 8 },
  hint: { color: '#666', marginBottom: 12 },
  label: { marginBottom: 4, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  card: { borderWidth: 1, borderColor: '#0a6b45', borderRadius: 8, padding: 12, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  pw: { marginVertical: 6, fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});
