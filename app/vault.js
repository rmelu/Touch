import * as SecureStore from 'expo-secure-store';

const KEY_PREFIX = 'dito_';

async function getEntry(id) {
  const key = KEY_PREFIX + id;
  const value = await SecureStore.getItemAsync(key);
  return value ? JSON.parse(value) : null;
}

async function saveEntry(id, email, password) {
  const key = KEY_PREFIX + id;
  const value = JSON.stringify({ email, password });
  await SecureStore.setItemAsync(key, value);
}

async function clearEntry(id) {
  const key = KEY_PREFIX + id;
  await SecureStore.deleteItemAsync(key);
}

export { getEntry, saveEntry, clearEntry };
