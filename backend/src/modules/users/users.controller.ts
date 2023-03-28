import { JwtAuthGuard } from '@guards/jwt.guard';
import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  find() {
    return this.usersService.find();
  }

  @Delete()
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
