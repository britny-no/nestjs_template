import { Controller, Post, Body, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateOrderCommand } from "./commands/create-order.command";
import { GetOrderQuery } from "./queries/get-order.query";

@Controller("order")
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createOrder(
    @Body() body: { id: string; item: string; quantity: number },
  ) {
    await this.commandBus.execute(
      new CreateOrderCommand(body.id, body.item, body.quantity),
    );
    return;
  }

  @Get()
  async getOrders() {
    await this.queryBus.execute(new GetOrderQuery());
    return;
  }
}
