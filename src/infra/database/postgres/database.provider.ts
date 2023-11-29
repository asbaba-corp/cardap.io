import { DataSource } from 'typeorm';
import { Menu } from '@/domain/menus/entities/menu.entity';
import { Order } from '@/domain/order/entities/Order';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.PG_DATABASE_URL,
        entities: [
            Menu,
            Order
        ]
      });

      return dataSource.initialize();
    },
  },
];