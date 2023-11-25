import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { randomUUID } from 'crypto';
import { RedisService } from 'nestjs-redis';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TablesGateway {
  private tables: string[] = [];

  constructor(private readonly redisRepository: RedisService) {
  }

  @WebSocketServer()
  server: Server;

  async get(key: string) {
    return await this.redisRepository.getClient().get(key);
  }

  async set(key: string, value: string) {
    return await this.redisRepository.getClient().set(key, value)
  }


  @SubscribeMessage('joinTable')
  async joinTable(@MessageBody() data: {id?: string, participant: string}) {
    console.log('jointable')
    if (!data.id) {
      data.id = randomUUID()
    }
    const tableExists = await this.get(data.id);
    console.log(tableExists)
    if (!tableExists) {
      await this.set(data.id, JSON.stringify([data.participant]));
    }
/*     if (tableExists) {
      
      await this.set(data.id, JSON.stringify())
    } */

    return await this.get(data.id);
  }
}