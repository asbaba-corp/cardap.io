import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Id of the group to create',
  })
  id: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({
    type: [String],
    description:
      'Participants of the group, groups must have 1 participant to be created',
  })
  participants: string[];
}
