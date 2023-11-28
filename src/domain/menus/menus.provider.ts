import { DataSource } from 'typeorm';
import { Menu } from '@/domain/menus/entities/menu.entity'

export const menusProvider = [
  {
    provide: 'MENUS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Menu),
    inject: ['DATA_SOURCE'],
  },
];