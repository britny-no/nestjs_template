import { DataSource } from "typeorm";
import { config } from "dotenv";

config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "testdb",
  entities: [__dirname + "/**/*.entity.{ts,js}"],
  migrations: ["src/migrations/*.ts"],
  migrationsTableName: "migrations",
});
