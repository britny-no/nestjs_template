export class Order {
  public id: string;
  public item: string;
  public quantity: number;
  public status: "PENDING" | "PAID";

  constructor(id: string, item: string, quantity: number) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
    this.status = "PENDING";
  }
}
