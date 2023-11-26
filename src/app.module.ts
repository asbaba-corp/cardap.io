import { Module } from '@nestjs/common';
import { MenusModule } from './menus/menus.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MenusModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
