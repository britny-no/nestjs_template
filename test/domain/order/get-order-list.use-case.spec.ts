import { Test, TestingModule } from "@nestjs/testing";

import { IOrderRepository } from "src/module/order/order.repository";
import { Order } from "src/module/order/order.entity";
import { InMemoryOrderRepository } from "src/infrastructure/db/order-memory.repository";
import { GetOrderListUseCase } from "src/module/order/use-cases/get-order-list.use-case";

describe("GetOrderListUseCase", () => {
  let useCase: GetOrderListUseCase;
  let repository: IOrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOrderListUseCase,
        {
          provide: "IOrderRepository",
          useClass: InMemoryOrderRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetOrderListUseCase>(GetOrderListUseCase);
    repository = module.get<IOrderRepository>("IOrderRepository");
  });

  it("should return an array of orders", async () => {
    // Given
    const order1 = new Order("1", "itemA", 2);
    const order2 = new Order("2", "itemB", 1);

    await repository.save(order1);
    await repository.save(order2);

    // When
    const result: Order[] = await useCase.execute();

    // Then
    expect(result).toHaveLength(2);
    expect(result[0].item).toBe("itemA");
    expect(result[1].item).toBe("itemB");
  });
});
