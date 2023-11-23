import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiResponse({
    status: 200,
  })
  async create(@Body() createMenuDto: CreateMenuDto) {
    const response = await this.menusService.create(createMenuDto);
    return response;
  }

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }
}
