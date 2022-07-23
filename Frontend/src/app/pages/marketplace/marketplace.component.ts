import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  INITIAL_CONTENTS = [
    {
      key: '0',
      name: 'Goat of American Football',
      hash: 'QmdvNmoHorPMCKkFQV4YHkxwpj9P9K2KXNkaZiqdbiYZbt',
      image: 'loading',
    },
    {
      key: '1',
      name: 'Goat of Basketball',
      hash: 'QmVLiUoBnEBDjgTX9Qepzs7mUWvz5LC9uZ8suhgRZEHppu',
      image: 'loading',
    },
    {
      key: '2',
      name: 'Goat of Chess',
      hash: 'Qmd63VhjRK3er8PFQURfsp6vV3bBiQbwZTpQ1wsKaiaGBx',
      image: 'loading',
    },
    {
      key: '3',
      name: 'Goat of Football',
      hash: 'QmUKXuqEuR4EyiSHmHHVEDD7T81bAoSCiLZdkL6325FgF6',
      image: 'loading',
    },
    {
      key: '4',
      name: 'Goat of Free Solo',
      hash: 'QmXnmQbtsLHmx8MG8x2K1PbLEoY2X76CZ75MCA4MyuXRvp',
      image: 'loading',
    },
    {
      key: '5',
      name: 'Goat of MMA',
      hash: 'QmWhizFTbfPPX3RxzQtjyL8DX1FARrXUXf4JW5iKSBht7p',
      image: 'loading',
    },
    {
      key: '6',
      name: 'Goat of Rock Climbing',
      hash: 'QmYfybB7ZF84UbF3KWPdwVu1JTiEwP77Dnkfyaqpt8pVop',
      image: 'loading',
    },
    {
      key: '7',
      name: 'Goat of Strength',
      hash: 'QmdQKYiwupHDTK3Wiu2hLaE9zj6YuB7jGoDTeouovYpgq2',
      image: 'loading',
    },
    {
      key: '8',
      name: 'Goat of Swimming',
      hash: 'Qmb9WzL9BDaSGJjRj59H9esi2k4PJQQPtGR9nT3R1R4ErT',
      image: 'loading',
    },
    {
      key: '9',
      name: 'Goat of Tennis',
      hash: 'Qmd7n4ZLFuHfjkUSDVfeLCJX9gvbPGdEt35pZtp1dvNpf5',
      image: 'loading',
    },
  ];

  nftCollection: { key: string; name: string; hash: string; image: string }[] =
    [];
  pendingTx: {
    tokenId: number;
    hash: string;
    confirmations: number;
    updateOngoing?: boolean;
  }[] = [];

  constructor(
    private blockchainService: BlockchainService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.nftCollection = this.INITIAL_CONTENTS;
    this.getNFTs();
  }

  private getNFTData(index: number) {
    this.apiService.getNFTURI(index).then((result: any) => {
      if (Object.keys(result).length >= 0) {
        this.nftCollection[index] = {
          key: String(index),
          name: this.capitalizeWords(result.name),
          hash: result.hash,
          image: `https://ipfs.io/ipfs/${result.hash}?filename=${result.name}.jpg`,
        };
      }
    });
  }

  private getNFTs() {
    let nftCollectionLength = 0;
    this.apiService.getNFTCollection().subscribe((result: any) => {
      nftCollectionLength = Object.keys(result).length;
      for (let i = 0; i < nftCollectionLength; i++) {
        this.getNFTData(i);
      }
    });
  }

  public openFileInIPFS(url: string) {
    window.open(url, '_blank');
  }

  public getNFT(tokenId: string) {
    this.blockchainService
      .signGetNFT(Number(tokenId))
      .then(({ from, signature }) => {
        this.apiService
          .getNFT(
            from,
            this.blockchainService.userAddress,
            Number(tokenId),
            signature
          )
          .subscribe((res) => {
            this.pendingTx.push({
              tokenId: Number(tokenId),
              hash: res.hash,
              confirmations: res.confirmations,
            });
          });
      });
  }

  public capitalizeWords(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(' ');
  }
}
