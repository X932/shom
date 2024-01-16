import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchesEntity } from './models/branches.entity';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';

@Module({
  controllers: [BranchesController],
  providers: [BranchesService],
  exports: [BranchesService],
  imports: [TypeOrmModule.forFeature([BranchesEntity])],
})
export class BranchesModule {}
