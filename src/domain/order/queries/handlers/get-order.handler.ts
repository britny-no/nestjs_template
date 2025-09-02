import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { GetOrdersQuery } from "../get-order.query";
import type { Order } from "../../order.entity";
import type { IOrderRepository } from "src/domain/order/order.repository";

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(
    @Inject("IOrderRepository")
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(_query: GetOrdersQuery): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }
}
