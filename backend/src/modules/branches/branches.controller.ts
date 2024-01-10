import { JwtAuthGuard } from '@guards/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesEntity } from './models/branches.entity';

@UseGuards(JwtAuthGuard)
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  getList(): Promise<BranchesEntity[]> {
    return this.branchesService.getList();
  }
}
