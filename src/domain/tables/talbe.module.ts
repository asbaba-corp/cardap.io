
import { Module } from '@nestjs/common';
import { TablesGateway } from './table.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [TablesGateway],
})
export class TableModule {}
