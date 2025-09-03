import { BaseException } from "./base.exception";
import { ErrorCodeEnum } from "../enums/errorCode.enum";

export abstract class ApplicationException extends BaseException {
  protected constructor(message: string, code: ErrorCodeEnum, cause?: Error) {
    super(message, code, cause);
  }
}
