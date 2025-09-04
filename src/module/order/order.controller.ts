import { Controller, Post, Body, Get } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import {
  ApiTags,
  ApiOperation,
  getSchemaPath,
  ApiExtraModels,
  ApiOkResponse,
  ApiBody,
} from "@nestjs/swagger";
import { CreateOrderReqDto } from "src/module/order/dto/request/createOrder.dto";
import { GetOrderListResDto } from "src/module/order/dto/response/getOrderList.dto";
import { Order } from "src/module/order/order.entity";
import { CreateOrderUseCase } from "./use-cases/create-order.use-case";
import { GetOrderListUseCase } from "./use-cases/get-order-list.use-case";

@ApiTags("Order")
@Controller("order")
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderListUseCase: GetOrderListUseCase,
  ) {}

  @ApiOperation({
    summary: "주문 생성",
    description: "주문 생성",
  })
  @ApiBody({ type: CreateOrderReqDto })
  @Post()
  async createOrder(@Body() body: CreateOrderReqDto) {
    await this.createOrderUseCase.execute(body);
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
    const orders: Order[] = await this.getOrderListUseCase.execute();

    return plainToInstance(GetOrderListResDto, orders);
  }
}
