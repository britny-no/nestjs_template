import { Controller, Post, Body, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import {
  ApiTags,
  ApiOperation,
  getSchemaPath,
  ApiExtraModels,
  ApiOkResponse,
  ApiBody,
} from "@nestjs/swagger";

import { CreateOrderCommand } from "./commands/create-order.command";
import { GetOrderQuery } from "./queries/get-order.query";
import { GetOrderListResDto } from "./dto/response/getOrderList.dto";
import { Order } from "./order.entity";
import { CreateOrderReqDto } from "./dto/request/createOrder.dto";

@ApiTags("Order")
@Controller("order")
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    summary: "주문 생성",
    description: "주문 생성",
  })
  @ApiBody({ type: CreateOrderReqDto })
  @Post()
  async createOrder(@Body() body: CreateOrderReqDto) {
    await this.commandBus.execute(
      new CreateOrderCommand(body.id, body.item, body.quantity),
    );
    return;
  }

  @ApiOperation({
    summary: "주문 목록 조회",
    description: "주문 목록 조회",
  })
  @ApiExtraModels(GetOrderListResDto)
  @ApiOkResponse({
    schema: {
      type: "array",
      items: { $ref: getSchemaPath(GetOrderListResDto) },
    },
  })
  @Get("/list")
  async getOrderList(): Promise<GetOrderListResDto[]> {
    const orders: Order[] = await this.queryBus.execute(new GetOrderQuery());

    return plainToInstance(GetOrderListResDto, orders);
  }
}
