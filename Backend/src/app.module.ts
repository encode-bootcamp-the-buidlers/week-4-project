import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { ContractController } from './contract/contract.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MulterModule.register({
      dest: '../upload',
    }),
  ],
  controllers: [AppController, ContractController],
  providers: [AppService],
})
export class AppModule {}
