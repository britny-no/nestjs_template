import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class GetOrderListResDto {
  @ApiProperty({ name: "id", description: "id", type: "string" })
  @Expose()
  id: string;

  @ApiProperty({ name: "item", description: "item", type: "string" })
  @Expose()
  item: string;

  @ApiProperty({ name: "quantity", description: "quantity", type: "number" })
  @Expose()
  quantity: number;
}
