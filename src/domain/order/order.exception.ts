export class OrderAlreadyRegisteredException extends Error {
  constructor(orderId: string) {
    super(`Order ${orderId} has already been regiered.`);
    this.name = "OrderAlreadyRegisteredException";
  }
}
