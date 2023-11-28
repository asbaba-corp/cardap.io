
import { Module } from '@nestjs/common';
import { TablesGateway } from '@/domain/tables/table.gateway';

@Module({
  imports: [],
  providers: [TablesGateway],
})
export class TableModule { }
