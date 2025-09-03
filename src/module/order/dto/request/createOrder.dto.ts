import { Expose, Type, Exclude } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ErrorCodeEnum } from "src/common/enums/errorCode.enum";
import { DetailCodeEnum } from "src/common/enums/detailCode.enum";

@Exclude()
export class CreateOrderReqDto {
  @ApiProperty({ name: "id", description: "인덱스", type: String })
  @Expose({ name: "id" })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.CANT_EMPTY,
      field: "id",
    },
  })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: "id",
    },
  })
  @Type(() => String)
  id: string;

  @ApiProperty({ name: "item", description: "아이템", type: String })
  @Expose({ name: "item" })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.CANT_EMPTY,
      field: "item",
    },
  })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: "item",
    },
  })
  @Type(() => String)
  item: string;

  @ApiProperty({ name: "quantity", description: "수량", type: Number })
  @Expose({ name: "quantity" })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.CANT_EMPTY,
      field: "quantity",
    },
  })
  @IsNumber(
    {},
    {
      context: {
        errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
        detailCode: DetailCodeEnum.NOT_A_NUMBER,
        field: "quantity",
      },
    },
  )
  @Type(() => Number)
  quantity: number;
}
