import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //const createUserDto = req.body
    if (
      !createUserDto.first_name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException('datos incompletos', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('limit') limit) {
    // const limit = req.query.limit
    console.log(limit);
    const users = this.usersService.findAll();
    return { status: 'success', data: users };
  }

  @Get(':id')
  findOne(@Param('id') userId: string) {
    //const userId = req.params.id
    if (isNaN(+userId)) {
      throw new HttpException('parametro invalido', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.findOne(+userId); //parseInt(userId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
