import { Module } from '@nestjs/common';
import { MenusModule } from './domain/menus/menus.module';
import { ConfigModule } from '@nestjs/config';
import { TableModule } from './domain/tables/table.module';
import { RedisModule } from 'nestjs-redis';

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
  providers: [TableModule],
})
export class AppModule { }
