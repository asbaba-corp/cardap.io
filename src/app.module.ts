import { Module } from '@nestjs/common';
import { MenusModule } from './domain/menus/menus.module';
import { ConfigModule } from '@nestjs/config';
import { TableModule } from './domain/tables/talbe.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MenusModule,
    TableModule
  ],
  controllers: [],
  providers: [TableModule],
})
export class AppModule { }
