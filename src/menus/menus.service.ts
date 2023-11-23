import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu';
import { PersistanceMenusRepository } from './repositories/menus.repository.persistance';

export class MenusService {
  constructor(private readonly menusRepository: PersistanceMenusRepository) {}

  async create(payload: CreateMenuDto) {
    const serializedMenu = Menu.create(payload);
    const menu = await this.menusRepository.save(serializedMenu);
    return menu;
  }

  async findOne(id: string) {
    const menu = await this.menusRepository.findOne(id);
    return menu;
  }

  async findAll() {
    const menus = await this.menusRepository.findAll();
    return menus;
  }
}
