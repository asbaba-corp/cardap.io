import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CloseParticipantOrderDto {
  @ApiProperty({
    description: 'The ID of the table for whom the order should be closed',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsNotEmpty()
  tableId: string;

  @ApiProperty({
    description: 'The amount to deduct from the order price',
    example: 50.25,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'The participant that closing his part',
    example: 'jápagueinelson da silva',
  })
  @IsNotEmpty()
  @IsString()
  participant: string;

  @ApiProperty({
    description: "The orderId",
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsNotEmpty()
  @IsString()
  orderId: string;
}