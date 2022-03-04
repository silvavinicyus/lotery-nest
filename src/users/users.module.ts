import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UserModel } from './user.model';
import { UsersResolver } from './user.resolver';
import { UserService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    PermissionsModule,
    AuthorizationModule,
  ],
  providers: [UserService, UsersResolver],
  exports: [UserService],
})
export class UserModule {}
