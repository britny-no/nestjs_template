import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";

import { GetOrdersQuery } from "../get-order.query";
import type { Order } from "../../order.entity";
import type { IOrderRepository } from "src/domain/order/order.repository";
import { InfrastructureException } from "src/infrastructure/exceptions/infrastructure.exception";

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(
    @Inject("IOrderRepository")
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(_query: GetOrdersQuery): Promise<Order[]> {
    try {
      return await this.orderRepository.findAll();
    } catch (err) {
      if (err instanceof InfrastructureException) {
        throw new HttpException(
          "시스템 오류가 발생했습니다.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw err;
    }
  }
}
