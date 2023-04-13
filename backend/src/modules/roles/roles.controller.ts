import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { TrimPipe } from '@pipes/trim.pipe';
import { RoleDto, UpdateRoleDto } from './models/roles.dto';
import { RolesService } from './roles.service';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  find() {
    return this.rolesService.find();
  }

  @Post()
  @UsePipes(TrimPipe)
  create(@Body() newRole: RoleDto) {
    return this.rolesService.create(newRole);
  }

  @Put()
  @UsePipes(TrimPipe)
  update(@Body() updatedRole: UpdateRoleDto) {
    return this.rolesService.update(updatedRole);
  }

  @Delete()
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.rolesService.delete(id);
  }
}
