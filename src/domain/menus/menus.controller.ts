import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenusService } from '@/domain/menus/menus.service';
import { CreateMenuDto } from '@/domain/menus/dto/create-menu.dto';
import { UpdateMenuDto } from '@/domain/menus/dto/update-menu.dto';
import { UpdateMenuItemDto } from '@/domain/menus/dto/update-menu-items.dto';
import { CreateMenuItemDto } from '@/domain/menus/dto/create-menu-item.dto';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({ status: 200, description: 'Returns the created menu' })
  async create(@Body() createMenuDto: CreateMenuDto) {
    const response = await this.menusService.create(createMenuDto);
    return response;
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Create a new item in a menu' })
  @ApiResponse({ status: 200, description: 'Add a new item to the menu' })
  async createMenuItem(
    @Param("id") id: string,
    @Body() createMenuItemDto: CreateMenuItemDto,
  ) {
    return await this.menusService.createMenuItem(id, createMenuItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, description: 'Returns an array of menus' })
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu by ID' })
  @ApiResponse({ status: 200, description: 'Returns the menu with the specified ID' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu by ID' })
  @ApiResponse({ status: 200, description: 'Updates the menu' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  updateMenu(@Param("id") id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto)
  }

  @Patch(':id/items/:itemName')
  @ApiOperation({ summary: 'Update an item in a menu by ID and item name' })
  @ApiResponse({ status: 200, description: 'Update menu with the modified item' })
  @ApiResponse({ status: 404, description: 'Menu or item not found' })
  updateMenuItems(@Param("id") id: string, @Param('itemName') itemName: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.menusService.updateMenuItem(id, itemName, updateMenuItemDto)
  }
}
