import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { JoinGroupDto } from './dto/join-group.dto';
import { Group } from './entities/group.entity';
import { JoinGroupBatchDto } from './dto/join-group-batch.dto';

@Injectable()
export class GroupsService {
  groups: Group[] = [];

  create({ id, participants }: CreateGroupDto) {
    if (!!this.findGroup(id)) {
      throw new ConflictException();
    }
    this.groups.push({
      id,
      participants,
    });
  }

  findAll() {
    return this.groups;
  }

  findOne(id: string) {
    return this.findGroup(id);
  }

  join(joinGroupDto: JoinGroupDto) {
    const group = this.findGroup(joinGroupDto.id);
    if (!group) {
      throw new NotFoundException();
    }
    group.participants.push(joinGroupDto.participant);
    return group;
  }

  joinBatch(joinGroupBatchDto: JoinGroupBatchDto) {
    const group = this.findGroup(joinGroupBatchDto.id);
    if (!group) {
      throw new NotFoundException();
    }
    group.participants.push(...joinGroupBatchDto.participants);
    return group;
  }

  private findGroup(id: string) {
    return this.groups.find((group) => group.id === id);
  }
}
