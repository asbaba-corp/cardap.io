import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JoinGroupDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Id of the group to join',
  })
  id: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Participant that are join the group',
  })
  participant: string;
}
