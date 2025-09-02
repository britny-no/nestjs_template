export class Order {
  public readonly id: string;
  public readonly item: string;
  public readonly quantity: number;

  constructor(id: string, item: string, quantity: number) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
  }
}
