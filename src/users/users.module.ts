import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { UsersResolver } from './user.resolver';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [UserService, UsersResolver],
  exports: [UserService],
})
export class UserModule {}
