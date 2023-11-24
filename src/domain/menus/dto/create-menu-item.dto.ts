import { IsString, IsOptional, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty({ description: 'Name of the menu item', type: String })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the menu item', type: String, required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the menu item', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'URL of the image for the menu item', type: String, required: false })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}