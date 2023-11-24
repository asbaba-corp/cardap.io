import { DataSource } from 'typeorm';
import { Menu } from './menus/entities/menu.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        ssl: true,
        url: process.env.PG_DATABASE_URL,
        entities: [
            Menu
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];