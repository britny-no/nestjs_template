import { Inject, Injectable } from "@nestjs/common";

import type { IOrderRepository } from "src/module/order/order.repository";

import { CreateOrderReqDto } from "../dto/request/createOrder.dto";
import { Order } from "../order.entity";
import { OrderService } from "../order.service";

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject("IOrderRepository")
    private readonly orderRepository: IOrderRepository,
    private readonly orderService: OrderService,
  ) {}

  async execute(dto: CreateOrderReqDto): Promise<Order> {
    const { id, item, quantity } = dto;
    const order = new Order(id, item, quantity);

    await this.orderService.checkRegistered(order.id);
    await this.orderRepository.save(order);

    return order;
  }
}
