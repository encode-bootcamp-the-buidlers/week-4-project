export class GetNFTDto {
  constructor(
    public from: string,
    public to: string,
    public tokenId: number,
    public signature: string
  ) {}
}
