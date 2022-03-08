import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/users/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
