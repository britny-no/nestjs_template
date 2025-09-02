import { Test, TestingModule } from "@nestjs/testing";
import { CreateOrderHandler } from "src/domain/order/commands/handlers/create-order.handler";
import { CreateOrderCommand } from "src/domain/order/commands/create-order.command";
import { Order } from "src/domain/order/order.entity";
import { InMemoryOrderRepository } from "src/infrastructure/order-memory";

describe("CreateOrderHandler", () => {
  let handler: CreateOrderHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderHandler,
        {
          provide: "IOrderRepository",
          useClass: InMemoryOrderRepository,
        },
      ],
    }).compile();

    handler = module.get<CreateOrderHandler>(CreateOrderHandler);
  });

  it("should create an order", async () => {
    const command = new CreateOrderCommand("1", "Apple", 3);
    const result: Order = await handler.execute(command);

    expect(result).toBeInstanceOf(Order);
    expect(result.id).toBe("1");
    expect(result.item).toBe("Apple");
    expect(result.quantity).toBe(3);
  });
});
