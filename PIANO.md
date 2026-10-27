# Come costruire un'app Expo (React Native) chiamata DITO, un password manager che si sblocca con l'impronta digitale

## Passi per la costruzione dell'app DITO

### 1. Installazione di Node.js
- Scarica e installa Node.js da [https://nodejs.org/](https://nodejs.org/).

### 2. Installazione di Expo CLI
- Apri il terminale e esegui il comando:
  ```
  npm install -g expo-cli
  ```

### 3. Creazione del progetto Expo
- Nella directory desiderata, esegui il comando:
  ```
  expo init DITO
  ```
- Seleziona la template "blank" quando richiesto.

### 4. Installazione di React Native Elements
- Nella directory del progetto, esegui il comando:
  ```
  expo install react-native-elements
  ```

### 5. Installazione di react-native-gesture-handler
- Nella directory del progetto, esegui il comando:
  ```
  expo install react-native-gesture-handler
  ```

### 6. Installazione di react-native-screens
- Nella directory del progetto, esegui il comando:
  ```
  expo install react-native-screens
  ```

### 7. Installazione di react-native-safe-area-context
- Nella directory del progetto, esegui il comando:
  ```
  expo install react-native-safe-area-context
  ```

### 8. Installazione di react-native-imprint
- Nella directory del progetto, esegui il comando:
  ```
  expo install react-native-imprint
  ```
  **Nota:** Questo pacchetto potrebbe non essere disponibile su Expo. Se non lo è, potrebbe essere necessario utilizzare un pacchetto alternativo o implementare l'impronta digitale manualmente.

### 9. Configurazione del progetto
- Apri il progetto in un editor di codice (ad esempio, VSCode).
- Modifica il file `App.js` per implementare l'interfaccia dell'app DITO.

### 10. Implementazione dell'impronta digitale
- Utilizza il pacchetto `react-native-imprint` per implementare l'autenticazione con impronta digitale.
- Assicurati di gestire correttamente gli errori e le eccezioni.

### 11. Implementazione del password manager
- Implementa la logica per salvare, recuperare e gestire le password.
- Utilizza uno stato locale o un database per memorizzare le password.

### 12. Test dell'app
- Esegui l'app su un dispositivo fisico o un emulatore Android/iOS.
- Verifica che l'app si sblocca correttamente con l'impronta digitale e che la gestione delle password funzioni correttamente.

### 13. Pubblicazione dell'app
- Segui le istruzioni di pubblicazione su Expo per distribuire l'app su Google Play e Apple App Store.
