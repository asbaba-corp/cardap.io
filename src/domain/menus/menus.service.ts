import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { UpdateMenuItemDto } from './dto/update-menu-items.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@Injectable()
export class MenusService {
  constructor(
    @Inject('MENUS_REPOSITORY')
    private menusRepository: Repository<Menu>,
  ) { }

  async create(payload: CreateMenuDto) {
    const menu = await this.menusRepository.save(payload);
    return menu;
  }

  async findOne(id: string) {
    const menu = await this.menusRepository.findOne({
      where: {
        id
      }
    });
    if (!menu) {
      throw new NotFoundException(`Menu not found. Menu id: ${id}`);
    }
    return menu;
  }

  async findAll() {
    const menus = await this.menusRepository.find();
    return menus;
  }

  async update(id: string, updateMenu: UpdateMenuDto) {
    await this.menusRepository.update(id, updateMenu)
  }

  async updateMenuItem(id: string, itemName: string, updateMenuItemDto: UpdateMenuItemDto) {
    const updateResult = await this.menusRepository
      .createQueryBuilder()
      .update(Menu)
      .set({ items: () => `jsonb_set(items, '{${itemName}}', '${JSON.stringify(updateMenuItemDto.items)}')` })
      .where("id = :id")
      .setParameter("id", id)
      .execute();

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Menu or item not found. Menu id: ${id}, Item name: ${itemName}`);
    }

    return updateResult;
  }

  async createMenuItem(id: string, createMenuItemDto: CreateMenuItemDto) {
    const updateResult = await this.menusRepository
      .createQueryBuilder()
      .update(Menu)
      .set({ items: () => `items || '${JSON.stringify([createMenuItemDto])}'::jsonb` })
      .where('id = :id')
      .setParameter('id', id)
      .execute();

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }
  }
}
