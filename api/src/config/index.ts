import { ConfigModule } from '@nestjs/config';

export const EnvConfig = ConfigModule.forRoot({
  isGlobal: false, //모듈에서 사용시 import하는 통일성 위해 False
  cache: true,
});
