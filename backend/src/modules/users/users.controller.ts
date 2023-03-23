import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create() {
    return this.usersService.create();
  }

  @Get()
  find() {
    return this.usersService.find();
  }
}
