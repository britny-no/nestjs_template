import { IOrderRepository } from "src/domain/order/order.repository";
import { Order } from "src/domain/order/order.entity";

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  async save(order: Order): Promise<void> {
    this.orders.push(order);
    return Promise.resolve();
  }

  async findById(id: string): Promise<Order | undefined> {
    const order = this.orders.find((order) => order.id === id);
    return Promise.resolve(order);
  }

  async findAll(): Promise<Order[]> {
    return Promise.resolve([...this.orders]);
  }
}
