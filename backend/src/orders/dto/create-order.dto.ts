import { Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty, IsString, IsInt, Min, ValidateNested } from 'class-validator';

class OrderProductDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}
