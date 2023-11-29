import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/postgres/database.module';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [OrderService],
})
export class OrderModule {}
