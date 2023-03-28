import { JwtAuthGuard } from '@guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './models/users.dto';
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

  @Put()
  update(@Body() user: UserDto) {
    return this.usersService.update(user);
  }
}
