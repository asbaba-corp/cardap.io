import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsString, IsUUID, IsInt, ArrayNotEmpty, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the table where the order is placed',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsNotEmpty()
  @IsUUID()
  tableId: string;

  @ApiProperty({
    description: 'Order price',
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;

  @ApiProperty({
    description: 'Array of item IDs in the order',
    example: ['123e4567-e89b-12d3-a456-426614174002', '123e4567-e89b-12d3-a456-426614174003'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  itemsId: string[];

  @ApiProperty({
    description: 'The ID of the menu associated with the order',
    example: '123e4567-e89b-12d3-a456-426614174004',
  })
  @IsNotEmpty()
  @IsUUID()
  menuId: string;
}