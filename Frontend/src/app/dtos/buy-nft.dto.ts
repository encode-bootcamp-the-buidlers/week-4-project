export class BuyNFTDto {
  constructor(
    public address: string,
    public to: string,
    public tokenId: number,
    public signature: string
  ) {}
}
