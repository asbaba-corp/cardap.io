import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';

import { MenusModule } from '@/domain/menus/menus.module';
import { TableModule } from '@/domain/tables/table.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: 6379,
    }),
    MenusModule,
    TableModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
