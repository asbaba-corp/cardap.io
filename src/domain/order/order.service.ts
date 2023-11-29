import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ORDER_STATUS, Order } from '@/domain/order/entities/Order';
import { CreateOrderDto } from '@/domain/order/dto/create-order.dto';
import { CloseParticipantOrderDto } from '@/domain/order/dto/close-participant-order.dto';
import { AppendItemToOrderDto } from '@/domain/order/dto/append-item-to-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  async appendItemToOrder({ orderId, itemId, quantity, price }: AppendItemToOrderDto): Promise<Order> {
    const order = await this.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    for (let i = 0; i < quantity; i++) {
      order.itemsId.push(itemId);
      order.price += price;
    }
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async closeParticipantOrder({ amount, tableId, orderId }: CloseParticipantOrderDto) {
    const orderToUpdate = await this.orderRepository.findOne({
      where: {
        status: ORDER_STATUS.PENDING,
        tableId: tableId,
        id: orderId
      },
    });

    if (!orderToUpdate) {
      throw new NotFoundException(`Open order not found`);
    }
    if (orderToUpdate.price - amount < 0) {
      throw new BadRequestException('Cannot reduce price to a negative value');
    }
    const updatedPrice = orderToUpdate.price - amount;
    if (updatedPrice === 0) {
      orderToUpdate.status = ORDER_STATUS.COMPLETED;
    }
    const updatedOrder = this.orderRepository.create({
      ...orderToUpdate,
      price: updatedPrice,
      reductionAmount: orderToUpdate.reductionAmount + amount,
    });
    return updatedOrder;
  }

  async closeOrder(orderId: string) {
    const order = await this.findById(orderId);
    order.status = ORDER_STATUS.COMPLETED;
    return await this.orderRepository.save(order)
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
  async findById(id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        id
      }
    });
  }
  async updateOrder(id: string, updateOrderDto: Partial<CreateOrderDto>): Promise<void> {
    await this.orderRepository.update(id, updateOrderDto);
  }
}