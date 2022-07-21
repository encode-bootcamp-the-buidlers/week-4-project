import { ApiProperty } from '@nestjs/swagger';

export class GetNFTDto {
  @ApiProperty({
    required: true,
    description: 'Address current owner of the NFT token',
    example: '0x74121B1461631a021Dd36528baeBeCB45e61552f',
    minLength: 42,
    maxLength: 42,
  })
  from: string;

  @ApiProperty({
    required: true,
    description: 'Address that will receive the NFT token',
    example: '0x74121B1461631a021Dd36528baeBeCB45e61552f',
    minLength: 42,
    maxLength: 42,
  })
  to: string;

  @ApiProperty({
    required: true,
    description: 'Token ID of the NFT',
    example: '0',
    minLength: 1,
    maxLength: 90,
  })
  tokenId: number;

  @ApiProperty({
    required: true,
    description: 'Signature payload',
  })
  signature: string;
}
