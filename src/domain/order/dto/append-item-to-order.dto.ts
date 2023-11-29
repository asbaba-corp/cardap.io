import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AppendItemToOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly orderId: string;

  @IsNotEmpty()
  @IsString()
  readonly itemId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}