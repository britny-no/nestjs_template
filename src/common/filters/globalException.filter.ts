import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";
import { DomainException } from "../exceptions/domain.exception";
import { ErrorCodeEnum } from "../enums/errorCode.enum";
import { InfrastructureException } from "../exceptions/infrastructure.exception";
import { ValidationException } from "../exceptions/validation.exception";

const ErrorCodeHttpStatusMap = {
  [ErrorCodeEnum.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorCodeEnum.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  [ErrorCodeEnum.ALREADY_REGISTERED]: HttpStatus.BAD_REQUEST,
  [ErrorCodeEnum.DB_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ErrorCodeEnum.INVALID_DATA_TYPE]: HttpStatus.UNPROCESSABLE_ENTITY,
} satisfies Record<ErrorCodeEnum, number>;

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof DomainException) {
      const status =
        ErrorCodeHttpStatusMap[exception.code] ?? HttpStatus.BAD_REQUEST;

      this.logger.error(
        `[DomainException] ${exception.message}`,
        exception.cause?.stack,
      );

      return response.status(status).json({
        code: exception.code,
        message: exception.message,
      });
    }

    if (exception instanceof ValidationException) {
      const status = HttpStatus.UNPROCESSABLE_ENTITY;

      this.logger.error(`[ValidationException] ${exception.message}`);

      return response.status(status).json({
        code: exception.code,
        message: exception.message,
      });
    }

    if (exception instanceof InfrastructureException) {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;

      this.logger.error(
        `[InfrastructureException] ${exception.message}`,
        exception.cause?.stack,
      );

      return response.status(status).json({
        code: exception.code,
        message: exception.message,
      });
    }

    const unknownError = exception as Error;
    this.logger.error(
      `[UnknownException] ${unknownError.message}`,
      unknownError.stack,
    );

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    });
  }
}
