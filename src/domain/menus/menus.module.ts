import { Module } from '@nestjs/common';
import { MenusService } from '@/domain/menus/menus.service';
import { MenusController } from '@/domain/menus/menus.controller';
import { menusProvider } from '@/domain/menus/menus.provider';
import { DatabaseModule } from '@/infra/database/postgres/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MenusController],
  providers: [...menusProvider, MenusService],
})
export class MenusModule {}
