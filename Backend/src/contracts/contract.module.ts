import { Module } from '@nestjs/common';
import { GoatTokenContractController } from './goatToken/goattoken.contract.controller';
import { GoatTokenContractService } from './goatToken/goattoken.contract.service';
import { ERC20ContractController } from './erc20Token/erc20.contract.controller';
import { ERC20ContractService } from './erc20Token/erc20.contract.service';

@Module({
  controllers: [GoatTokenContractController, ERC20ContractController],
  providers: [GoatTokenContractService, ERC20ContractService],
})
export class ContractModule {}
