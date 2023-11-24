import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsUrl } from "class-validator";

export class EnterTableDto {
  @ApiProperty({ description: 'Name of the menu item', type: String })
  @IsString()
  name: string;

  @ApiProperty({ description: "Table to join", type: String })
  @IsString()
  tableId: string;
}