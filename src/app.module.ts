import { Module } from '@nestjs/common';
import { MenusModule } from './domain/menus/menus.module';
import { ConfigModule } from '@nestjs/config';
import { TableModule } from './domain/tables/table.module';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.register({
      host: "oregon-redis.render.com",
      port: 6379,
      password: process.env.REDIS_PASSWORD
    }),
    MenusModule,
    TableModule
  ],
  controllers: [],
  providers: [TableModule],
})
export class AppModule { }
