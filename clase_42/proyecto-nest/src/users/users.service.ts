import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: Array<User>;
  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    let newId = 0;
    if (this.users.length > 0) {
      newId = this.users.length++;
    } else {
      newId = 1;
    }
    const newUser: User = {
      id: newId,
      first_name: createUserDto.first_name,
      last_name: '',
      email: createUserDto.email,
      password: createUserDto.password,
    };
    this.users.push(newUser);
    return 'usuario creado';
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
