export class CreateOrderCommand {
  constructor(
    public readonly id: string,
    public readonly item: string,
    public readonly quantity: number,
  ) {}
}
