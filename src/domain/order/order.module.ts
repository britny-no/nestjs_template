import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { OrderService } from "./order.service";

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
