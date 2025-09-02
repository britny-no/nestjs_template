import { DomainException } from "../common/domain.exception";

export class OrderAlreadyRegisteredException extends DomainException {
  constructor(orderId: string) {
    super(`Order ${orderId} has already been regiered.`);
    this.name = "OrderAlreadyRegisteredException";
  }
}
