import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";

import { CreateOrderCommand } from "../create-order.command";
import { Order } from "../../order.entity";
import type { IOrderRepository } from "src/domain/order/order.repository";
import { OrderService } from "../../order.service";
import { InfrastructureException } from "src/infrastructure/exceptions/infrastructure.exception";
import { DomainException } from "src/domain/common/domain.exception";

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @Inject("IOrderRepository")
    private readonly orderRepository: IOrderRepository,
    private readonly orderService: OrderService,
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    try {
      const { id, item, quantity } = command;
      const order = new Order(id, item, quantity);

      await this.orderService.checkRegistered(order.id);
      await this.orderRepository.save(order);

      return order;
    } catch (err) {
      if (err instanceof DomainException) {
        throw new HttpException(
          "이미 등록된 주문입니다.",
          HttpStatus.BAD_REQUEST,
        );
      } else if (err instanceof InfrastructureException) {
        throw new HttpException(
          "시스템 오류가 발생했습니다.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw err;
    }
  }
}
