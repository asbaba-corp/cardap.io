import { randomUUID } from 'crypto';
import { CreateMenuDto } from '../dto/create-menu.dto';

type IMenu = Omit<Menu, 'serialize'>;

export class Menu {
  id: string;
  name: string;
  items: Record<string, string>[];

  private constructor(menuDto: CreateMenuDto) {
    this.id = randomUUID();
    this.name = menuDto.name;
    this.items = menuDto.items;
  }

  static create(menuDto: CreateMenuDto): IMenu {
    const menu = new Menu(menuDto);
    return menu;
  }
}
