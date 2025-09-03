import { Test, TestingModule } from "@nestjs/testing";

import { GetOrdersHandler } from "src/module/order/queries/handlers/get-order.handler";
import { IOrderRepository } from "src/module/order/order.repository";
import { Order } from "src/module/order/order.entity";
import { GetOrderQuery } from "src/module/order/queries/get-order.query";
import { InMemoryOrderRepository } from "src/infrastructure/db/order-memory.repository";

describe("GetOrdersHandler", () => {
  let handler: GetOrdersHandler;
  let repository: IOrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOrdersHandler,
        {
          provide: "IOrderRepository",
          useClass: InMemoryOrderRepository,
        },
      ],
    }).compile();

    handler = module.get<GetOrdersHandler>(GetOrdersHandler);
    repository = module.get<IOrderRepository>("IOrderRepository");
  });

  it("should return an array of orders", async () => {
    // Given
    const query = new GetOrderQuery();
    const order1 = new Order("1", "itemA", 2);
    const order2 = new Order("2", "itemB", 1);

    await repository.save(order1);
    await repository.save(order2);

    // When
    const result: Order[] = await handler.execute(query);

    // Then
    expect(result).toHaveLength(2);
    expect(result[0].item).toBe("itemA");
    expect(result[1].item).toBe("itemB");
  });
});
