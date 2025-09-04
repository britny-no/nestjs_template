import { Test, TestingModule } from "@nestjs/testing";
import { CreateOrderReqDto } from "src/module/order/dto/request/createOrder.dto";

import { OrderController } from "src/module/order/order.controller";
import { CreateOrderUseCase } from "src/module/order/use-cases/create-order.use-case";
import { GetOrderListUseCase } from "src/module/order/use-cases/get-order-list.use-case";

describe("OrdersController", () => {
  let controller: OrderController;
  let createOrderUseCase: CreateOrderUseCase;
  let getOrderListUseCase: GetOrderListUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: CreateOrderUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetOrderListUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    createOrderUseCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    getOrderListUseCase = module.get<GetOrderListUseCase>(GetOrderListUseCase);
  });

  it("should call CommandBus.execute on createOrder", async () => {
    // Given
    const dto = new CreateOrderReqDto();
    dto.id = "1";
    dto.item = "Apple";
    dto.quantity = 3;

    // When
    await controller.createOrder(dto);

    // Then
    expect(createOrderUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it("should call QueryBus.execute on getOrders", async () => {
    // Given
    // When
    await controller.getOrderList();

    // Then
    expect(getOrderListUseCase.execute).toHaveBeenCalledWith();
  });
});
