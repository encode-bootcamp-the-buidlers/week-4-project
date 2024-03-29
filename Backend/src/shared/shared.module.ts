import { Global, Module } from '@nestjs/common';
import { ProviderService } from './services/provider.service';
import { WalletService } from './services/wallet.service';
import { SignerService } from './services/signer.service';

@Global()
@Module({
  providers: [ProviderService, WalletService, SignerService],
  exports: [ProviderService, WalletService, SignerService],
})
export class SharedModule {}
