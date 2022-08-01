import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractModule } from './contracts/contract.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    MulterModule.register({
      dest: '../upload',
    }),
    ContractModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
