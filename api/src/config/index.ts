import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

export const EnvConfig = ConfigModule.forRoot({
  envFilePath: path.join(
    __dirname,
    '../../envs/',
    `.env.${process.env.NODE_ENV || 'qa'}`,
  ),
  isGlobal: false, //모듈에서 사용시 import하는 통일성 위해 False
  cache: true,
});
