import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { CreateOrderCommand } from "../create-order.command";
import { Order } from "../../order.entity";
import type { IOrderRepository } from "src/module/order/order.repository";
import { OrderService } from "../../order.service";

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @Inject("IOrderRepository")
    private readonly orderRepository: IOrderRepository,
    private readonly orderService: OrderService,
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const { id, item, quantity } = command;
    const order = new Order(id, item, quantity);

    await this.orderService.checkRegistered(order.id);
    await this.orderRepository.save(order);

    return order;
  }
}
