import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationResolver } from './authorization.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModel } from './authorization.model';
import { PermissionModel } from 'src/permissions/permissions.model';
import { UserModel } from 'src/users/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizationModel, PermissionModel, UserModel]),
  ],
  providers: [AuthorizationService, AuthorizationResolver],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
