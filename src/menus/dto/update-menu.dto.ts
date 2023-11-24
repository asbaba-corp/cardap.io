import { IsOptional, IsString } from "class-validator";


export class UpdateMenuDto {
  @IsString()
  @IsOptional()
  owner?: string;

  @IsString()
  @IsOptional()
  name?: string;

}