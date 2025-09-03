import { Test, TestingModule } from "@nestjs/testing";

import { OrderService } from "src/module/order/order.service";
import { IOrderRepository } from "src/module/order/order.repository";
import { DomainException } from "src/common/exceptions/domain.exception";
import { ErrorCodeEnum } from "src/common/enums/errorCode.enum";

describe("OrderService", () => {
  let service: OrderService;
  let orderRepository: IOrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: "IOrderRepository",
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<IOrderRepository>("IOrderRepository");
  });

  it("should not throw when order does not exist", async () => {
    // Given
    (orderRepository.findById as jest.Mock).mockResolvedValue(null);

    // When
    await expect(service.checkRegistered("123")).resolves.toBeUndefined();

    // Then
    expect(orderRepository.findById).toHaveBeenCalledWith("123");
  });

  it("should throw DomainException when order exists", async () => {
    // Given
    (orderRepository.findById as jest.Mock).mockResolvedValue({ id: "123" });

    // When
    await expect(service.checkRegistered("123")).rejects.toThrow(
      new DomainException(
        "order already registered",
        ErrorCodeEnum.ALREADY_REGISTERED,
      ),
    );

    // Then
    expect(orderRepository.findById).toHaveBeenCalledWith("123");
  });
});
