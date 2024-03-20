import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { ROUTES } from '@constants/routes';
import { BranchesService } from './branches.service';
import { BranchesEntity } from './models/branches.entity';

@UseGuards(JwtAuthGuard)
@Controller(ROUTES.BRANCHES)
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  getList(): Promise<BranchesEntity[]> {
    return this.branchesService.getList();
  }
}
