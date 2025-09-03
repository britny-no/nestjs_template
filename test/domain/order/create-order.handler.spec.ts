import { Test, TestingModule } from "@nestjs/testing";

import { CreateOrderHandler } from "src/module/order/commands/handlers/create-order.handler";
import { CreateOrderCommand } from "src/module/order/commands/create-order.command";
import { Order } from "src/module/order/order.entity";

import { OrderService } from "src/module/order/order.service";
import { DomainException } from "src/common/exceptions/domain.exception";
import { ErrorCodeEnum } from "src/common/enums/errorCode.enum";
import { InMemoryOrderRepository } from "src/infrastructure/db/order-memory.repository";

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
      throw new DomainException(
        "order already registered",
        ErrorCodeEnum.ALREADY_REGISTERED,
      );
    });

    const command = new CreateOrderCommand("1", "Apple", 3);

    // When
    await expect(handler.execute(command)).rejects.toThrow(DomainException);

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
