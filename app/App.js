import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [message, setMessage] = useState('Accesso negato');
  const [buttonText, setButtonText] = useState('Riprova');

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          setMessage('Sbloccato');
          setButtonText('Blocca');
        }
      } catch (error) {
        setMessage('Accesso negato');
        setButtonText('Riprova');
      }
    };

    checkAuthentication();
  }, []);

  const handlePress = async () => {
    if (buttonText === 'Blocca') {
      try {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          setMessage('Sbloccato');
          setButtonText('Blocca');
        } else {
          setMessage('Accesso negato');
          setButtonText('Riprova');
        }
      } catch (error) {
        setMessage('Accesso negato');
        setButtonText('Riprova');
      }
    } else {
      setMessage('Accesso negato');
      setButtonText('Riprova');
    }
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button title={buttonText} onPress={handlePress} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
