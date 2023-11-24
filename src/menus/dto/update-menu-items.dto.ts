import { Type } from "class-transformer";
import { IsString, IsOptional, IsNumber, IsUrl, IsArray, ValidateNested } from "class-validator";

class ItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}

export class UpdateMenuItemDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @IsOptional()
  items?: ItemDto
}