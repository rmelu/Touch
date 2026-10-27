# Touch

**Un gestore di password pensato per essere semplicissimo.**

> ⚠️ **Prototipo didattico. Non usare per password vere.**
> Il progetto non ha ancora ricevuto una revisione di sicurezza e il backup non è ancora stato realizzato.

## L'idea

Molti gestori di password sono complicati per chi non è pratico di tecnologia.
Touch parte da un'idea diversa: una griglia di riquadri grandi, uno per servizio
(Netflix, Gmail, Amazon...), ognuno con un pulsante **ENTRA**.
Un tocco, l'impronta digitale, e sei dentro.

Principi del progetto:

- **I tuoi dati restano tuoi.** Le password sono cifrate sul telefono con una password principale.
  Un eventuale backup nel cloud contiene solo dati illeggibili: chi viola il server non può leggerli.
- **Impronta digitale** per aprire l'app e per leggere i dati.
- **Più account per servizio.** Puoi avere 5 email diverse su Gmail.
- **Interfaccia semplice**, con pochi pulsanti e testi grandi.

## Come funziona

- I dati sono salvati con `expo-secure-store`, cifrati dal sistema Android.
- L'opzione `requireAuthentication` lega l'accesso ai dati alla biometria.
- Una password si vede solo toccando "Mostra".

## Requisiti

- **Node.js** (versione LTS recente) e **npm**
- Un telefono **Android** con l'app **Expo Go** aggiornata
  (questo progetto usa **Expo SDK 58**: l'SDK di Expo Go deve coincidere)
- Un'**impronta digitale registrata** nel telefono
- Computer e telefono con connessione internet

Le librerie (Expo, React Native, expo-local-authentication, expo-secure-store...)
sono elencate in `app/package.json` e si installano da sole con `npm install`.

## Installazione

```bash
git clone <indirizzo-del-repository>
cd dito/app
npm install
```

(`dito` è il nome della cartella del progetto: cambialo solo se rinomini davvero la cartella.)

## Avvio

```bash
npx expo start --tunnel ngrok
```

Quando compare il QR code, apri **Expo Go** sul telefono, scegli "Scan QR code"
e inquadralo. Per ricaricare l'app, scuoti il telefono e premi **Reload**.

Se il tunnel normale (`--tunnel`) non funziona, usa `--tunnel ngrok`.
Se computer e telefono sono sulla stessa rete Wi-Fi, puoi provare `--lan`
(con una macchina virtuale serve la rete in modalità "Bridged").

## Struttura

```
app/
  App.js            schermata principale, blocco con impronta
  Grid.js           griglia dei servizi
  Tile.js           un singolo riquadro con pulsante ENTRA
  ServiceScreen.js  lista degli account di un servizio
  services.js       elenco dei servizi (Netflix, Gmail...)
  vault.js          lettura e scrittura cifrata dei dati
```

## Stato del progetto

Touch è in sviluppo. Le funzioni principali (impronta, griglia, più account per servizio) funzionano.
Ancora da completare:

- **Backup e recupero cifrati**: per non perdere le password se si cambia o si rompe il telefono.
- **Build compilata**: per verificare al 100% la protezione con impronta (Expo Go può ignorarla).
- **Revisione di sicurezza** prima di un uso con password vere.

Piattaforma attuale: Android.

## Prossimi passi

- [x] Griglia dei servizi con impronta
- [x] Più account per servizio
- [ ] Backup cifrato nel cloud con password principale (recupero su un nuovo telefono)
- [ ] Build compilata (development build) per verificare la biometria
- [ ] Revisione di sicurezza
- [ ] Aggiunta di servizi personalizzati

## Licenza

Scegli una licenza prima di pubblicare (per esempio MIT).