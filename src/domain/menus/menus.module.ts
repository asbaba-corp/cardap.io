import { Module } from '@nestjs/common';
<<<<<<< Updated upstream
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { menusProvider } from './menus.provider';
import { DatabaseModule } from '../database.module';
=======
import { MenusService } from '@/domain/menus/menus.service';
import { MenusController } from '@/domain/menus/menus.controller';
import { menusProvider } from '@/domain/menus/menus.provider';
import { DatabaseModule } from '@/infra/database/postgres/database.module';
>>>>>>> Stashed changes

@Module({
  imports: [DatabaseModule],
  controllers: [MenusController],
  providers: [...menusProvider, MenusService],
})
export class MenusModule {}
