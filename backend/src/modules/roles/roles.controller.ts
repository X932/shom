import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { TrimPipe } from '@pipes/trim.pipe';
import { CreateRoleDto } from './models/roles.dto';
import { RolesService } from './roles.service';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  @UsePipes(TrimPipe)
  create(@Body() newRole: CreateRoleDto) {
    return this.rolesService.create(newRole);
  }
}
