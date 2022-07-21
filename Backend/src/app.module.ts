import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { ContractController } from './contract/contract.controller';
import { AppService } from './app.service';
import { ContractService } from './contract/contract.service';
import { ProviderService } from './shared/services/provider.service';
import { SignerService } from './shared/services/signer.service';
import { WalletService } from './shared/services/wallet.service';

@Module({
  imports: [
    MulterModule.register({
      dest: '../upload',
    }),
  ],
  controllers: [AppController, ContractController],
  providers: [
    AppService,
    ContractService,
    ProviderService,
    SignerService,
    WalletService,
  ],
})
export class AppModule {}
