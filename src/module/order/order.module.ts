import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { OrderService } from "./order.service";
import { GetOrdersHandler } from "./queries/handlers/get-order.handler";
import { CreateOrderHandler } from "./commands/handlers/create-order.handler";
import { OrderController } from "src/module/order/order.controller";
import { InMemoryOrderRepository } from "src/infrastructure/db/order-memory.repository";

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
