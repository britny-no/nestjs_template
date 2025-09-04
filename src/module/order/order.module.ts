import { Module } from "@nestjs/common";

import { OrderService } from "./order.service";
import { OrderController } from "src/module/order/order.controller";
import { InMemoryOrderRepository } from "src/infrastructure/db/order-memory.repository";
import { CreateOrderUseCase } from "./use-cases/create-order.use-case";
import { GetOrderListUseCase } from "./use-cases/get-order-list.use-case";

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    OrderService,
    CreateOrderUseCase,
    GetOrderListUseCase,
    {
      provide: "IOrderRepository",
      useClass: InMemoryOrderRepository,
    },
  ],
})
export class OrderModule {}
