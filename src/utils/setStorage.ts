import * as Keychain from 'react-native-keychain';

export class KeychainStore {}

export const getSecureValue = async (key: string) => {
  const result = await Keychain.getGenericPassword({service: key});
  if (result) {
    return result.password;
  }
  return false;
};

export const removeSecureValue = async (key: string) =>
  await Keychain.resetGenericPassword({service: key});

export const setSecureValue = async (key: string, value: string) =>
  await Keychain.setGenericPassword(key, value, {service: key});
