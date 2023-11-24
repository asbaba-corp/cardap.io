import { DataSource } from 'typeorm';
import { Menu } from './entities/menu.entity';

export const menusProvider = [
  {
    provide: 'MENUS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Menu),
    inject: ['DATA_SOURCE'],
  },
];