import { DetailCodeEnum } from "../enums/detailCode.enum";
import { ErrorCodeEnum } from "../enums/errorCode.enum";
import { ApplicationException } from "./application.exception";
import { ValidationError } from "class-validator";

interface ValidationMessage {
  message: string;
  errorCode: ErrorCodeEnum;
  detailCode: DetailCodeEnum;
  field?: string;
}
interface Context {
  errorCode?: string;
  detailCode?: string;
  field?: string;
}

function isContext(obj: unknown): obj is Context {
  return typeof obj === "object" && obj !== null;
}

function extractValidationMessages(error: ValidationError): ValidationMessage {
  if (error.constraints) {
    const message = Object.values(error.constraints)[0];

    let ctx: Context = {};
    if (error.contexts) {
      const values = Object.values(error.contexts);
      if (isContext(values[0])) {
        ctx = values[0];
      }
    }

    return {
      message,
      errorCode:
        (ctx.errorCode as ErrorCodeEnum) ?? ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode:
        (ctx.detailCode as DetailCodeEnum) ?? DetailCodeEnum.INVALID_DATA,
      field: ctx.field ?? "error",
    };
  }

  return {
    message: "error",
    errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
    detailCode: DetailCodeEnum.INVALID_DATA,
  };
}

export class ValidationException extends ApplicationException {
  constructor(error: ValidationError) {
    const { message, errorCode } = extractValidationMessages(error);
    super(message, errorCode);
  }
}
