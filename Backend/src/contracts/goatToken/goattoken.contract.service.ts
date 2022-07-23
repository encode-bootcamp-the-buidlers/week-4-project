import { Injectable } from '@nestjs/common';
import { ProviderService } from 'src/shared/services/provider.service';
import { SignerService } from 'src/shared/services/signer.service';
import { ethers } from 'ethers';
import * as TokenContract from 'src/assets/contracts/GoatToken.json';

@Injectable()
export class GoatTokenContractService {
  contractPublicInstance: ethers.Contract;
  contractSignedInstance: ethers.Contract;

  constructor(
    private providerService: ProviderService,
    private signerService: SignerService,
  ) {
    this.setupContractInstances();
  }

  setupContractInstances() {
    const contractAddress = process.env.GOAT_TOKEN_CONTRACT_ADDRESS;
    if (!contractAddress || contractAddress.length === 0) return;
    this.contractPublicInstance = new ethers.Contract(
      contractAddress,
      TokenContract.abi,
      this.providerService.provider,
    );
    this.contractSignedInstance = new ethers.Contract(
      contractAddress,
      TokenContract.abi,
      this.signerService.signer,
    );
  }

  async getNFT(from: string, to: string, tokenId: number) {
    const tx = await this.contractSignedInstance.transferFrom(
      from,
      to,
      tokenId,
    );
    return tx;
  }

  checkSignature(from: string, to: string, tokenId: number, signature: string) {
    const signatureObject = { from: from, to: to, tokenId: tokenId };
    const signatureMessage = JSON.stringify(signatureObject);
    const signerAddress = ethers.utils.verifyMessage(
      signatureMessage,
      signature,
    );
    return signerAddress == to;
  }
}
