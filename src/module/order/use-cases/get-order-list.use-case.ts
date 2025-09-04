import { Inject, Injectable } from "@nestjs/common";

import { Order } from "../order.entity";
import type { IOrderRepository } from "src/module/order/order.repository";

@Injectable()
export class GetOrderListUseCase {
  constructor(
    @Inject("IOrderRepository")
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }
}
