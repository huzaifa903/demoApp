// src/auth.js
import * as Keychain from 'react-native-keychain';

// store token + expiry (ms since epoch)
export async function saveTokens({token, refresh, expiresAt}) {
  const json = JSON.stringify({token, refresh, expiresAt});
  await Keychain.setGenericPassword('auth', json, {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

export async function getTokens() {
  const creds = await Keychain.getGenericPassword();
  if (!creds) return null;
  return JSON.parse(creds.password);
}

export async function clearTokens() {
  await Keychain.resetGenericPassword();
}
