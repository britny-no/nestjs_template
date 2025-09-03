import { Injectable, Inject } from "@nestjs/common";

import type { IOrderRepository } from "src/module/order/order.repository";
import { DomainException } from "src/common/exceptions/domain.exception";
import { ErrorCodeEnum } from "src/common/enums/errorCode.enum";

@Injectable()
export class OrderService {
  constructor(
    @Inject("IOrderRepository")
    private readonly orderRepository: IOrderRepository,
  ) {}

  async checkRegistered(id: string): Promise<void> {
    const order = await this.orderRepository.findById(id);

    if (order) {
      throw new DomainException(
        "order already registered",
        ErrorCodeEnum.ALREADY_REGISTERED,
      );
    }
  }
}
