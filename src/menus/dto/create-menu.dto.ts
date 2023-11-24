import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, IsUrl, ValidateNested } from "class-validator";

class ItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUrl()
  imageUrl: string;
}

export class CreateMenuDto {
  @IsString()
  owner: string;
  @IsString()
  name: string;

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
