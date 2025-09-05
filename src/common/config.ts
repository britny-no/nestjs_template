import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

export const EnvConfig = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [`.env.${process.env.NODE_ENV}`, ".env"],
});

export const DbConfig = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: config.get<"postgres">("DB_TYPE", "postgres"),
    host: config.get<string>("DB_HOST", "localhost"),
    port: config.get<number>("DB_PORT", 5432),
    username: config.get<string>("DB_USER", "postgres"),
    password: config.get<string>("DB_PASS", "postgres"),
    database: config.get<string>("DB_NAME", "testdb"),
    entities: [__dirname + "/../**/*.entity.{ts,js}"],
    synchronize: false,
    migration: false,
  }),
});
