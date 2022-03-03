import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModel } from './permissions.model';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionModel])],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
