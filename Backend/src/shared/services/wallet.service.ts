import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

const EXPOSED_KEY =
  '8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f';

@Injectable()
export class WalletService {
  wallet: ethers.Wallet;

  constructor() {
    this.setupWallet();
  }

  setupWallet() {
    const isUsingMnemonic =
      process.env.MNEMONIC && process.env.MNEMONIC.length > 0;
    const path = `m/44'/60'/0'/0/0`; // change last 0 for using a different account

    this.wallet = isUsingMnemonic
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC!, path)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
    console.log(`Using address ${this.wallet.address}`);
  }

  walletAddress() {
    return this.wallet.address;
  }
}
