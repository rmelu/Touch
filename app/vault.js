import * as SecureStore from 'expo-secure-store';

const KEY_PREFIX = 'dito_';
const OPTIONS = {
  requireAuthentication: true,
  authenticationPrompt: 'Sblocca DITO',
};

export async function getAccounts(id) {
  const value = await SecureStore.getItemAsync(KEY_PREFIX + id, OPTIONS);
  if (!value) return [];
  const data = JSON.parse(value);
  if (Array.isArray(data)) return data;
  return [{ id: String(Date.now()), email: data.email, password: data.password }];
}

export async function saveAccounts(id, list) {
  await SecureStore.setItemAsync(KEY_PREFIX + id, JSON.stringify(list), OPTIONS);
}

export async function clearEntry(id) {
  await SecureStore.deleteItemAsync(KEY_PREFIX + id);
}