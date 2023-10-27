import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { JoinGroupDto } from './dto/join-group.dto';
import { ApiResponse } from '@nestjs/swagger';
import { JoinGroupBatchDto } from './dto/join-group-batch.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiResponse({
    status: 201,
  })
  create(@Body() createGroupDto: CreateGroupDto) {
    this.groupsService.create(createGroupDto);
    return 201;
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  join(@Body() joinGroupDto: JoinGroupDto) {
    return this.groupsService.join(joinGroupDto);
  }

  @Patch(':id')
  joinBatch(@Body() joinGroupDto: JoinGroupBatchDto) {
    return this.groupsService.joinBatch(joinGroupDto);
  }
}
