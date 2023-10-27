import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsService],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a group', () => {
    const newGroup = {
      id: '123456789',
      participants: ['member1'],
    };
    service.create(newGroup);

    expect(service.groups).toHaveLength(1);
    expect(service.groups).toStrictEqual([
      { id: '123456789', participants: ['member1'] },
    ]);
  });

  it('should throw if group already exists', () => {
    const newGroup = {
      id: '123456789',
      participants: ['member1'],
    };
    service.create(newGroup);

    try {
      service.create(newGroup);
    } catch (err) {
      expect(err).toBeInstanceOf(ConflictException);
    }
  });

  it('should return empty array when call findAll and none group exists', () => {
    expect(service.findAll()).toStrictEqual([]);
  });

  it('should add new participants to a group', () => {
    const newGroup = {
      id: '123456789',
      participants: ['member1'],
    };
    service.create(newGroup);

    const newParticipant = 'asbaba da silva';
    const groupToJoin = '123456789';
    service.join({
      id: groupToJoin,
      participant: newParticipant,
    });
    const group = service.groups.find((group) => group.id === groupToJoin);
    expect(group).toStrictEqual({
      id: '123456789',
      participants: ['member1', 'asbaba da silva'],
    });
  });

  it('should add new participants in batch to a group', () => {
    const newGroup = {
      id: '123456789',
      participants: ['member1'],
    };
    service.create(newGroup);

    const newParticipants = ['asbaba da silva', 'asbabanelson', 'asbaba jr'];
    const groupToJoin = '123456789';
    service.joinBatch({
      id: groupToJoin,
      participants: newParticipants,
    });
    const group = service.groups.find((group) => group.id === groupToJoin);
    expect(group).toStrictEqual({
      id: '123456789',
      participants: ['member1', 'asbaba da silva', 'asbabanelson', 'asbaba jr'],
    });
  });

  it('should throw when try to join a group that does not exists', () => {
    try {
      service.join({
        id: 'invalid group',
        participant: 'asbabanelson',
      });
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
