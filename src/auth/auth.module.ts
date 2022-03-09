import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/users/user.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, UserService],
})
export class AuthModule {}
