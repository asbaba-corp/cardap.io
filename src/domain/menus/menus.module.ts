import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { menusProvider } from './menus.provider';
import { DatabaseModule } from '../../infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MenusController],
  providers: [...menusProvider, MenusService],
})
export class MenusModule {}
