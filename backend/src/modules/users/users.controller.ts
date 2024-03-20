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
import { ROUTES } from '@constants/routes';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { UpdateUserDto } from './models/users.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller(ROUTES.USERS)
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
  update(@Body() user: UpdateUserDto) {
    return this.usersService.update(user);
  }
}
