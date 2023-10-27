import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JoinGroupBatchDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Id of the group to join',
  })
  id: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'Participants that are join the group',
  })
  participants: string[];
}
