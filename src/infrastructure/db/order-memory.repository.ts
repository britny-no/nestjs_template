import { IOrderRepository } from "src/module/order/order.repository";
import { Order } from "src/module/order/order.entity";
import { MemoryDatabaseException } from "../exceptions/memoryDatabaseException";

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  async save(order: Order): Promise<void> {
    try {
      this.orders.push(order);
      return Promise.resolve();
    } catch (err) {
      throw new MemoryDatabaseException(
        "DB Fail",
        err instanceof Error ? err : undefined,
      );
    }
  }

  async findById(id: string): Promise<Order | undefined> {
    try {
      const order = this.orders.find((order) => order.id === id);
      return Promise.resolve(order);
    } catch (err) {
      throw new MemoryDatabaseException(
        "DB Fail",
        err instanceof Error ? err : undefined,
      );
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return Promise.resolve([...this.orders]);
    } catch (err) {
      throw new MemoryDatabaseException(
        "DB Fail",
        err instanceof Error ? err : undefined,
      );
    }
  }
}
