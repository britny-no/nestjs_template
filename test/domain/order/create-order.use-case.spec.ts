import { Test, TestingModule } from "@nestjs/testing";

import { Order } from "src/module/order/order.entity";

import { OrderService } from "src/module/order/order.service";
import { DomainException } from "src/common/exceptions/domain.exception";
import { ErrorCodeEnum } from "src/common/enums/errorCode.enum";
import { InMemoryOrderRepository } from "src/infrastructure/db/order-memory.repository";
import { CreateOrderReqDto } from "src/module/order/dto/request/createOrder.dto";
import { CreateOrderUseCase } from "src/module/order/use-cases/create-order.use-case";

describe("CreateOrderUseCase", () => {
  let useCase: CreateOrderUseCase;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        CreateOrderUseCase,
        {
          provide: "IOrderRepository",
          useClass: InMemoryOrderRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
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

    const dto = new CreateOrderReqDto();
    dto.id = "1";
    dto.item = "Apple";
    dto.quantity = 3;

    // When
    await expect(useCase.execute(dto)).rejects.toThrow(DomainException);

    // Then
    expect(orderService.checkRegistered).toHaveBeenCalledWith("1");
  });

  it("should create an order", async () => {
    // Given
    const dto = new CreateOrderReqDto();
    dto.id = "1";
    dto.item = "Apple";
    dto.quantity = 3;

    // When
    const result: Order = await useCase.execute(dto);

    // Then
    expect(result).toBeInstanceOf(Order);
    expect(result.id).toBe("1");
    expect(result.item).toBe("Apple");
    expect(result.quantity).toBe(3);
  });
});
