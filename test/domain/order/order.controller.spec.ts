import { Test, TestingModule } from "@nestjs/testing";

import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateOrderCommand } from "src/module/order/commands/create-order.command";
import { GetOrderQuery } from "src/module/order/queries/get-order.query";
import { OrderController } from "src/module/order/order.controller";

describe("OrdersController", () => {
  let controller: OrderController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() },
        },
        {
          provide: QueryBus,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it("should call CommandBus.execute on createOrder", async () => {
    const dto = { id: "1", item: "Apple", quantity: 3 };
    await controller.createOrder(dto);
    expect(commandBus.execute).toHaveBeenCalledWith(
      new CreateOrderCommand("1", "Apple", 3),
    );
  });

  it("should call QueryBus.execute on getOrders", async () => {
    await controller.getOrderList();
    expect(queryBus.execute).toHaveBeenCalledWith(new GetOrderQuery());
  });
});
