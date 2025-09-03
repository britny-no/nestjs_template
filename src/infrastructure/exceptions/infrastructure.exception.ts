import { ErrorCodeEnum } from "src/common/enums/errorCode.enum";
import { InfrastructureException } from "src/common/exceptions/infrastructure.exception";

export class MemoryDatabaseException extends InfrastructureException {
  constructor(message: string, cause?: Error) {
    super(message, ErrorCodeEnum.DB_ERROR, cause);
  }
}
