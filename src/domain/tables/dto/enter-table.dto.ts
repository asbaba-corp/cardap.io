import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class EnterTableDto {
  @ApiProperty({ description: 'Name of the participant', type: String })
  @IsString()
  participant: string;

  @ApiProperty({ description: "Table to join", type: String })
  @IsString()
  tableId: string;
}