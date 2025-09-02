// infrastructure/exceptions/infrastructure.exception.ts
export class InfrastructureException extends Error {
  constructor(
    message: string,
    public readonly cause?: any,
  ) {
    super(message);
    this.name = "InfrastructureException";
  }
}
