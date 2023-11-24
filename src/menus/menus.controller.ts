import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { UpdateMenuItemDto } from './dto/update-menu-items.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  @Post()
  @ApiResponse({
    status: 200,
  })
  async create(@Body() createMenuDto: CreateMenuDto) {
    const response = await this.menusService.create(createMenuDto);
    return response;
  }

  @Post(':id/items')
  async createMenuItem(
    @Param("id") id: string,
    @Body() createMenuItemDto: CreateMenuItemDto,
  ) {
    return await this.menusService.createMenuItem(id, createMenuItemDto);
  }

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Patch(':id')
  updateMenu(@Param("id") id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto)
  }

  @Patch(':id/items/:itemName')
  updateMenuItems(@Param("id") id: string, @Param('itemName') itemName: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.menusService.updateMenuItem(id, itemName, updateMenuItemDto)
  }
}
