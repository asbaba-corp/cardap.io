import { Module } from '@nestjs/common';
import { MenusModule } from './domain/menus/menus.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MenusModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
