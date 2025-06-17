import { IsArray, ArrayNotEmpty } from "class-validator";

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  products: { productId: string; quantity: number; }[];
}