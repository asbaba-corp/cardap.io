import { Menu } from '../entities/menu';

export class PersistanceMenusRepository {
  async save(menu: Menu) {
    return menu;
  }

  async findOne(id: string) {
    return id;
  }

  async findAll() {
    return;
  }
}
