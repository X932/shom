import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesEntity } from './models/roles.entity';
import { EndpointsEntity } from '../../modules/endpoints/models/endpoints.entity';
import { EndpointsService } from '../endpoints/endpoints.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity, EndpointsEntity])],
  providers: [RolesService, EndpointsService],
  controllers: [RolesController],
})
export class RolesModule {}
