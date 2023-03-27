import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { TrimPipe } from '@pipes/trim.pipe';
import { CreateRoleDto, UpdateRoleDto } from './models/roles.dto';
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
  create(@Body() newRole: CreateRoleDto) {
    return this.rolesService.create(newRole);
  }

  @Put()
  @UsePipes(TrimPipe)
  update(@Body() updatedRole: UpdateRoleDto) {
    return this.rolesService.update(updatedRole);
  }
}