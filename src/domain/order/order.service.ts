import { Injectable, Inject } from "@nestjs/common";

import type { IOrderRepository } from "src/domain/order/order.repository";
import { OrderAlreadyRegisteredException } from "./order.exception";

@Injectable()
export class OrderService {
  constructor(
    @Inject("IOrderRepository")
    private readonly orderRepository: IOrderRepository,
  ) {}

  async checkRegistered(id: string): Promise<void> {
    const order = await this.orderRepository.findById(id);

    if (order) {
      throw new OrderAlreadyRegisteredException(id);
    }
  }
}
