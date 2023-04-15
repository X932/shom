import { JwtAuthGuard } from '@guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Put,
  Query,
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
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Put()
  update(@Body() user: Partial<UserDto>) {
    return this.usersService.update(user);
  }
}
