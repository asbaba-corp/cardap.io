import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ItemDto {
  @ApiProperty({ description: 'Name of the item', type: String })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the item', type: String })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Price of the item', type: Number })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'URL of the image for the item', type: String })
  @IsUrl()
  imageUrl: string;
}

export class CreateMenuDto {
  @ApiProperty({ description: 'Owner of the menu', type: String })
  @IsString()
  owner: string;

  @ApiProperty({ description: 'Name of the menu', type: String })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Array of items in the menu',
    type: ItemDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }[];
}