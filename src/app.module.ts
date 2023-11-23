import { Module } from '@nestjs/common';
import { GroupsModule } from './tables/groups.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [GroupsModule, MenusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
