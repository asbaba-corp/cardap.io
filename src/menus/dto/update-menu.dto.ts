import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiProperty({ description: 'Owner of the menu', type: String, required: false })
  @IsString()
  @IsOptional()
  owner?: string;

  @ApiProperty({ description: 'Name of the menu', type: String, required: false })
  @IsString()
  @IsOptional()
  name?: string;
}