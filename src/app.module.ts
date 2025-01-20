import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfig } from './config';

@Module({
  imports: [EnvConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
