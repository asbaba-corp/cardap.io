import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsUrl, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ItemDto {
  @ApiProperty({ description: 'Name of the item', type: String, required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description of the item', type: String, required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the item', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'URL of the image for the item', type: String, required: false })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}

export class UpdateMenuItemDto {
  @ApiProperty({
    description: 'Array of items to update',
    type: ItemDto,
    isArray: true,
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @IsOptional()
  items?: ItemDto[];
}