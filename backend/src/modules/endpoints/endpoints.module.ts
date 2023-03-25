import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndpointsController } from './endpoints.controller';
import { EndpointsService } from './endpoints.service';
import { EndpointsEntity } from './models/endpoints.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EndpointsEntity])],
  controllers: [EndpointsController],
  providers: [EndpointsService],
})
export class EndpointsModule {}
