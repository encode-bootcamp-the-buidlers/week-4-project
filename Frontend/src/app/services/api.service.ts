import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import { GetNFTDto } from '../dtos/get-nft.dto';
import { MintRequestDto } from '../dtos/mint-request.dto';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiAddress;

  constructor(
    private http: HttpClient,
    private blockchainService: BlockchainService
  ) {}

  getServerBlock() {
    return this.http.get<ethers.providers.Block>(`${this.apiUrl}block/block`);
  }

  getTransactionReceipt(hash: string) {
    return this.http.get<ethers.providers.TransactionReceipt>(
      `${this.apiUrl}block/transaction/${hash}`
    );
  }

  requestToken(address: string, amount: number, signature: string) {
    const requestDto = new MintRequestDto(address, amount, signature);
    return this.http.post<ethers.providers.TransactionResponse>(
      `${this.apiUrl}contract/mint-token`,
      requestDto
    );
  }

  getNFT(from: string, to: string, tokenId: number, signature: string) {
    const getNFTDto = new GetNFTDto(from, to, tokenId, signature);
    return this.http.post<ethers.providers.TransactionResponse>(
      `${this.apiUrl}contract/get-nft`,
      getNFTDto
    );
  }

  getNFTCollection() {
    return this.http.get(`${this.apiUrl}`);
  }

  async getNFTURI(index: number) {
    const tokenURI = await this.blockchainService.tokenURI(index);
    return lastValueFrom(this.http.get(tokenURI));
  }
}
