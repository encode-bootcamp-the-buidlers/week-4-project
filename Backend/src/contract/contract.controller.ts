import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { BuyNFTDto } from '../dtos/buy-nft.dto';

@Controller('contract')
@ApiTags('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('buy-nft')
  @ApiOperation({
    summary: 'Buy NFT',
    description: 'Requests to transfer the NFT to a provided address',
  })
  @ApiResponse({
    status: 200,
    description: 'Token balance',
    type: Number,
  })
  @ApiResponse({
    status: 401,
    description: 'Missing signature',
    type: HttpException,
  })
  @ApiResponse({
    status: 403,
    description: 'Wrong signature',
    type: HttpException,
  })
  @ApiResponse({
    status: 500,
    description: 'Invalid signature',
    type: HttpException,
  })
  @ApiResponse({
    status: 503,
    description: 'Server Error',
    type: HttpException,
  })
  async buyNFT(@Body() mintRequestDto: BuyNFTDto) {
    const signature = mintRequestDto.signature;
    if (!signature || signature.length == 0)
      throw new HttpException('Missing signature', 401);
    let signatureValid = false;
    try {
      signatureValid = this.contractService.checkSignature(
        mintRequestDto.address,
        mintRequestDto.amount,
        signature,
      );
    } catch (error) {
      throw new HttpException('Invalid signature: ' + error.message, 500);
    }
    if (!signatureValid)
      throw new HttpException(
        'Signature does not match with the requested address',
        403,
      );
    try {
      const result = await this.contractService.mintTokens(
        mintRequestDto.address,
        mintRequestDto.amount,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }
}
