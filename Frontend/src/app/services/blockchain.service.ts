import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ethers, EventFilter } from 'ethers';
import TokenContract from 'src/assets/contracts/Token.json';
import goatTokenJson from '../../../../blockchain-dev/artifacts/contracts/GoatToken.sol/GoatToken.json';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private window: any;
  provider: ethers.providers.Web3Provider;
  userWallet: ethers.Wallet;
  signer: ethers.Signer;
  userAddress: string;
  tokenContractInstance: ethers.Contract;
  goatTokenContract: ethers.Contract;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
    this.provider = this.getProvider();
    this.userWallet = ethers.Wallet.createRandom().connect(this.provider);
    this.signer = ethers.Wallet.createRandom();
    this.userAddress = '';
    this.tokenContractInstance = new ethers.Contract(
      environment.tokenContractAddress,
      TokenContract.abi
    ).connect(this.userWallet);
    this.goatTokenContract = new ethers.Contract(
      environment.goatTokenContractAddress,
      goatTokenJson.abi
    ).connect(this.userWallet);
    this.getSignerAndGoatTokenContract();
  }

  getProvider() {
    return new ethers.providers.Web3Provider(
      this.window.ethereum,
      environment.network
    );
  }

  async getSignerAndGoatTokenContract() {
    await this.provider.send('eth_requestAccounts', []);
    this.signer = this.provider.getSigner();
    this.userAddress = await this.signer.getAddress();
    console.log('Account:', await this.signer.getAddress());
    this.goatTokenContract = new ethers.Contract(
      environment.goatTokenContractAddress,
      goatTokenJson.abi
    ).connect(this.signer);
  }

  async address() {
    return this.userAddress || this.userWallet.address;
  }

  async etherBalance() {
    console.log('user address', this.userAddress);
    const etherBalanceBN = await this.provider.getBalance(
      this.userAddress || this.userWallet.address
    );
    const etherBalance = ethers.utils.formatEther(etherBalanceBN) + ' ETH';
    return etherBalance;
  }

  async networkName() {
    const networkName = environment.network;
    return networkName;
  }

  async number() {
    const number = await this.provider.getBlockNumber();
    return number.toFixed(0);
  }

  async tokenAddress() {
    const tokenAddress = environment.tokenContractAddress;
    return tokenAddress;
  }

  async tokenName() {
    const tokenName = await this.tokenContractInstance['name']();
    return tokenName;
  }

  async symbol() {
    const symbol = await this.tokenContractInstance['symbol']();
    return symbol;
  }

  async supply() {
    const supplyBN = await this.tokenContractInstance['totalSupply']();
    const supply = ethers.utils.formatEther(supplyBN);
    return supply + ' Tokens';
  }

  async tokenBalance() {
    const tokenBalanceBN = await this.tokenContractInstance['balanceOf'](
      this.userAddress || this.userWallet.address
    );
    const tokenBalance = ethers.utils.formatEther(tokenBalanceBN);
    return tokenBalance + ' Tokens';
  }

  async tokenURI(index: number) {
    return await this.goatTokenContract['tokenURI'](index);
  }

  watchBlockNumber(callbackFn: (...arg0: any) => void) {
    const filter = 'block';
    this.provider.on(filter, (event) => callbackFn(event));
  }

  watchUserBalanceEther(callbackFn: (...arg0: any) => void) {
    const filter = [
      ethers.utils.hexZeroPad(this.userAddress || this.userWallet.address, 32),
    ];
    this.provider.on(filter, (event) => callbackFn(event));
  }

  watchContractSupply(callbackFn: (...arg0: any) => void) {
    const filter = this.tokenContractInstance.filters['Transfer']();
    this.provider.on(filter, (event) => callbackFn(event));
  }

  watchUserBalanceToken(callbackFn: (...arg0: any) => void) {
    const filterFrom = this.tokenContractInstance.filters['Transfer'](
      this.userAddress || this.userWallet.address
    );
    const filterTo = this.tokenContractInstance.filters['Transfer'](
      null,
      this.userAddress || this.userWallet.address
    );
    this.tokenContractInstance.on(filterFrom, (event) => callbackFn(event));
    this.tokenContractInstance.on(filterTo, (event) => callbackFn(event));
  }

  async signTokenRequest(amount: number) {
    const signatureObject = {
      address: this.userAddress,
      amount: amount,
    };
    const signatureMessage = JSON.stringify(signatureObject);
    return await this.signer.signMessage(signatureMessage);
  }

  async signGetNFT(tokenId: number) {
    const tokenOwner = await this.goatTokenContract['ownerOf'](tokenId);
    const signatureObject = {
      from: tokenOwner,
      to: this.userAddress,
      tokenId,
    };
    const signatureMessage = JSON.stringify(signatureObject);
    return {
      from: tokenOwner,
      signature: await this.signer.signMessage(signatureMessage),
    };
  }

  async checkIsOwner(tokenId: number) {
    const tokenOwner = await this.goatTokenContract['ownerOf'](tokenId);
    return tokenOwner === this.userAddress;
  }
}
