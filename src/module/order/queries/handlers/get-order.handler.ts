import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { GetOrderQuery } from "../get-order.query";
import type { Order } from "../../order.entity";
import type { IOrderRepository } from "src/module/order/order.repository";

@QueryHandler(GetOrderQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrderQuery> {
  constructor(
    @Inject("IOrderRepository")
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(_query: GetOrderQuery): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }
}
