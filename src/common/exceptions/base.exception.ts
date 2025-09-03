import { ErrorCodeEnum } from "../enums/errorCode.enum";

export abstract class BaseException extends Error {
  constructor(
    readonly message: string,
    readonly code: ErrorCodeEnum,
    readonly cause?: Error,
  ) {
    super(message);
    this.name = new.target.name;
  }
}
