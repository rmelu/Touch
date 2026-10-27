# Come costruire un'app Expo (React Native) chiamata DITO, un password manager che si sblocca con l'impronta digitale

## Passi per la costruzione dell'app DITO

### 1. Installazione di Node.js
- Scarica e installa Node.js da [https://nodejs.org/](https://nodejs.org/).

### 2. Creazione del progetto Expo
- Nella directory desiderata, esegui il comando:
  ```
  npx create-expo-app DITO
  ```
- Seleziona la template "blank" quando richiesto.

### 3. Installazione delle librerie
- Nella directory del progetto, esegui i comandi:
  ```
  expo install expo-local-authentication expo-secure-store
  ```

### 4. Schermata sbloccata con impronta
- Implementa la logica per l'autenticazione con impronta digitale utilizzando `expo-local-authentication`.
- Assicurati di gestire correttamente gli errori e le eccezioni.

### 5. Salvare e rileggere una password
- Implementa la logica per salvare e recuperare le password utilizzando `expo-secure-store`.
- Assicurati di gestire correttamente gli errori e le eccezioni.

### 6. Lista password con pulsante copia
- Implementa una lista delle password con un pulsante per copiare la password selezionata.
- Assicurati di gestire correttamente gli eventi di selezione e copia.

### 7. Prova con Expo Go
- Esegui l'app su un dispositivo fisico o un emulatore Android/iOS utilizzando Expo Go.
- Verifica che l'app si sblocca correttamente con l'impronta digitale e che la gestione delle password funzioni correttamente.

## Più avanti
- Backup QR
- Estensione browser
- Autofill
