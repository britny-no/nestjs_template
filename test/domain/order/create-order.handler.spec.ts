import { Test, TestingModule } from "@nestjs/testing";
import { HttpException, HttpStatus } from "@nestjs/common";

import { CreateOrderHandler } from "src/domain/order/commands/handlers/create-order.handler";
import { CreateOrderCommand } from "src/domain/order/commands/create-order.command";
import { Order } from "src/domain/order/order.entity";
import { InMemoryOrderRepository } from "src/infrastructure/order-memory";
import { OrderService } from "src/domain/order/order.service";
import { OrderAlreadyRegisteredException } from "src/domain/order/order.exception";

describe("CreateOrderHandler", () => {
  let handler: CreateOrderHandler;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        CreateOrderHandler,
        {
          provide: "IOrderRepository",
          useClass: InMemoryOrderRepository,
        },
      ],
    }).compile();

    handler = module.get<CreateOrderHandler>(CreateOrderHandler);
    orderService = module.get<OrderService>(OrderService);
  });

  it("should throw ApplicationException when checkRegistered throws DomainException", async () => {
    // Given
    jest.spyOn(orderService, "checkRegistered").mockImplementation(() => {
      throw new OrderAlreadyRegisteredException("1");
    });

    const command = new CreateOrderCommand("1", "Apple", 3);

    // When
    await expect(handler.execute(command)).rejects.toThrow(HttpException);
    await expect(handler.execute(command)).rejects.toMatchObject({
      status: HttpStatus.BAD_REQUEST,
      message: "이미 등록된 주문입니다.",
    });

    // Then
    expect(orderService.checkRegistered).toHaveBeenCalledWith("1");
  });

  it("should create an order", async () => {
    // Given
    const command = new CreateOrderCommand("1", "Apple", 3);

    // When
    const result: Order = await handler.execute(command);

    // Then
    expect(result).toBeInstanceOf(Order);
    expect(result.id).toBe("1");
    expect(result.item).toBe("Apple");
    expect(result.quantity).toBe(3);
  });
});
