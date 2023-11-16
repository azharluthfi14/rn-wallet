import React, {useEffect, useState} from 'react';

import {ethers, Wallet} from 'ethers';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CryptoJS from 'react-native-crypto-js';

import {generateMnemonic, getSecureValue, setSecureValue} from '@/utils';

export const Home = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/2d730408bd194dbcaf2084b4d0006eb2',
  );

  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [key] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const token = await generateMnemonic();
      setMnemonic(token);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const tokenKey = await getSecureValue('encryptedPrivateKey');
        return tokenKey;
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const createWallet = async () => {
    const newWallet = ethers.Wallet.fromMnemonic(mnemonic!);

    newWallet.connect(provider);
    setWallet(newWallet);

    await encryptAndStorePrivateKey();

    setStep(s => s + 1);
  };

  const encryptAndStorePrivateKey = async () => {
    if (password && wallet) {
      const encryptedPrivateKey = CryptoJS.AES.encrypt(
        wallet.privateKey,
        password,
      ).toString();
      await setSecureValue('privateKey', encryptedPrivateKey);
    }
  };

  useEffect(() => {
    const loadWallet = async () => {
      if (!key) return;

      const bytes = CryptoJS.AES.decrypt(key, password);
      const privateKey = bytes.toString(CryptoJS.enc.Utf8);

      const wallet = new Wallet(privateKey, provider);
      setWallet(wallet);

      setStep(3);
    };

    loadWallet();
  }, [key, password, provider]);

  return (
    <View style={styles.container}>
      <Text>Create Wallet</Text>

      <StatusBar />
      {step === 1 ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Your password"
            value={password}
            onChangeText={(e: string) => setPassword(e)}
          />
          <Button
            title={'Create Wallet'}
            color="#333"
            onPress={() => createWallet()}
          />
        </>
      ) : step === 2 ? (
        <>
          <Text>Save the following prhase in a secure location</Text>
          <Text>{mnemonic}</Text>
          <Button title="Done" color="#333" onPress={() => setStep(3)} />
        </>
      ) : step === 3 ? (
        <>
          <Text>Wallet Address: {wallet?.address}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderColor: '#333',
    borderWidth: 1,
    width: '90%',
    padding: 10,
    borderRadius: 10,
  },
});
