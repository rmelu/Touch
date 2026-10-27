import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getAccounts, saveAccounts } from './vault';

export default function ServiceScreen({ service, onBack }) {
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shown, setShown] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setList(await getAccounts(service.id));
        setLoaded(true);
      } catch (e) {
        Alert.alert('Errore', 'Impossibile aprire il Vault.');
        onBack();
      }
    })();
  }, []);

  const persist = async (newList) => {
    try {
      await saveAccounts(service.id, newList);
      setList(newList);
    } catch (e) {
      Alert.alert('Errore', 'Salvataggio non riuscito.');
    }
  };

  const add = async () => {
    if (!loaded) return;
    if (!email || !password) {
      Alert.alert('Errore', 'Compila email e password.');
      return;
    }
    await persist([...list, { id: String(Date.now()), email, password }]);
    setEmail('');
    setPassword('');
  };

  const remove = (id) => persist(list.filter((a) => a.id !== id));

  return (
    <View style={s.card}>
      <TouchableOpacity onPress={onBack}>
        <Text style={s.back}>← Torna alla griglia</Text>
      </TouchableOpacity>
      <Text style={s.title}>{service.name}</Text>

      <FlatList
        data={list}
        keyExtractor={(a) => a.id}
        ListEmptyComponent={<Text style={s.empty}>Nessun account salvato.</Text>}
        renderItem={({ item }) => (
          <View style={s.row}>
            <View style={{ flex: 1 }}>
              <Text style={s.email}>{item.email}</Text>
              <Text>{shown === item.id ? item.password : '••••••••••'}</Text>
            </View>
            <Button
              title={shown === item.id ? 'Nascondi' : 'Mostra'}
              onPress={() => setShown(shown === item.id ? null : item.id)}
            />
            <Button title="X" color="red" onPress={() => remove(item.id)} />
          </View>
        )}
      />

      <Text style={s.label}>Aggiungi account</Text>
      <TextInput style={s.input} placeholder="Email o utente" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={s.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Aggiungi" color="#0a6b45" onPress={add} />
    </View>
  );
}

const s = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 12, elevation: 3 },
  back: { color: '#0a6b45', marginBottom: 15, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  empty: { color: '#666', marginVertical: 10 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 6 },
  email: { fontWeight: 'bold' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
});