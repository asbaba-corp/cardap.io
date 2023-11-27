import { NotFoundException } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RedisService } from 'nestjs-redis';
import { Server } from 'socket.io';
import { EnterTableDto } from './dto/enter-table.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TablesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly redisRepository: RedisService) {
  }

  @SubscribeMessage('joinTable')
  async joinTable(@MessageBody() { participant, tableId }: EnterTableDto) {
    const table = await this.get(tableId);
    if (!table) {
      await this.set(tableId, JSON.stringify([participant]));
    }
    if (table) {
      const tableArray = JSON.parse(table) as Array<String>;
      if (tableArray.includes(participant)) {
        return table;
      }
      tableArray.push(participant)
      await this.set(tableId, JSON.stringify(tableArray))
    }
    return await this.get(tableId);
  }

  @SubscribeMessage('closeTable')
  async closeTable(@MessageBody() id: string) {
    const table = await this.get(id);
    if (!table) {
      return new NotFoundException('table not found')
    }
    await this.delete(id)
  }

  /*  @SubscribeMessage('order')
   async order(@MessageBody() data: { tableId: string, participant: string, itemId: string, quantity: number }) {
     await this.orderService.order(data)
   } */

  /*  @SubscribeMessage('closeTableOrder')
   async order(@MessageBody() data: { tableId: string }) {
     await this.orderService.close(data)
   } */

  /*  @SubscribeMessage('closeParticipantOrder')
  async order(@MessageBody() data: { tableId: string, participant: string }) {
    await this.orderService.closeParticipant(data)
  } */

  async get(key: string) {
    return await this.redisRepository.getClient().get(key);
  }

  async set(key: string, value: string) {
    return await this.redisRepository.getClient().set(key, value)
  }

  async delete(id: string) {
    return await this.redisRepository.getClient().del(id);
  }

}