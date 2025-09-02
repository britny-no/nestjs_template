import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
})
export class OrderModule {}
