import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { OrderService } from "./order.service";
import { InMemoryOrderRepository } from "src/infrastructure/order-memory.repository";
import { GetOrdersHandler } from "./queries/handlers/get-order.handler";
import { CreateOrderHandler } from "./commands/handlers/create-order.handler";

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    GetOrdersHandler,
    CreateOrderHandler,
    {
      provide: "IOrderRepository",
      useClass: InMemoryOrderRepository,
    },
  ],
})
export class OrderModule {}
