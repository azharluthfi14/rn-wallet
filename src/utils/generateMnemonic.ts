import {ethers} from 'ethers';

export async function generateMnemonic() {
  const mnemonic = ethers.Wallet.createRandom().mnemonic;
  return mnemonic;
}
