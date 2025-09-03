import { BaseException } from "./base.exception";
import { ErrorCodeEnum } from "../enums/errorCode.enum";

export class DomainException extends BaseException {
  constructor(message: string, code: ErrorCodeEnum) {
    super(message, code);
  }
}
