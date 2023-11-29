import { NotFoundException } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RedisService } from 'nestjs-redis';
import { Server } from 'socket.io';
import { EnterTableDto } from '@/domain/tables/dto/enter-table.dto';
import { OrderService } from '../order/order.service';
import { AppendItemToOrderDto } from '../order/dto/append-item-to-order.dto';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { CloseParticipantOrderDto } from '../order/dto/close-participant-order.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TablesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly redisRepository: RedisService, private readonly orderService: OrderService) {
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

  @SubscribeMessage('createOrder')
  async createOrder(@MessageBody() data: CreateOrderDto) {
    return await this.orderService.createOrder(data)
  }

  @SubscribeMessage('appendItemToOrder')
  async appendItemToOrder(@MessageBody() { itemId, quantity, price, orderId }: AppendItemToOrderDto) {
    return await this.orderService.appendItemToOrder({
      itemId,
      quantity,
      price,
      orderId
    })
  }

  @SubscribeMessage('closeOrder')
  async closeOrder(@MessageBody() orderId: string) {
    return await this.orderService.closeOrder(orderId)
  }

  @SubscribeMessage('closeParticipantOrder')
  async closeParticipantOrder(@MessageBody() data: CloseParticipantOrderDto) {
    return await this.orderService.closeParticipantOrder(data);
  }

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