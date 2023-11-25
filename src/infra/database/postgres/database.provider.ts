import { DataSource } from 'typeorm';
import { Menu } from '../../../domain/menus/entities/menu.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        ssl: true,
        url: process.env.PG_DATABASE_URL,
        entities: [
            Menu,
            // @TODO: Add path for all .entity files of the project
        ]
      });

      return dataSource.initialize();
    },
  },
];