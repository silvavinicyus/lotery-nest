import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModel } from './permissions.model';
import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './permissions.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionModel])],
  providers: [PermissionsService, PermissionsResolver],
  exports: [PermissionsService],
})
export class PermissionsModule {}
