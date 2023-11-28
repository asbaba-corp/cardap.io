import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
<<<<<<< Updated upstream
=======
import { RedisModule } from 'nestjs-redis';
>>>>>>> Stashed changes

import { MenusModule } from '@/domain/menus/menus.module';
import { TableModule } from '@/domain/tables/table.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MenusModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
