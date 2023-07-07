import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('/api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private config: ConfigService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreated = await this.usersService.create(createUserDto);
      return { status: 'success', data: userCreated };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      console.log(this.config.get('SECRET_TOKEN'));
      const users = await this.usersService.findAll();
      return { status: 'success', data: users };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      return { status: 'success', data: user };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const userUpdated = await this.usersService.update(id, updateUserDto);
      return { status: 'success', data: userUpdated };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
      return { status: 'success', message: 'usuario eliminado' };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}
