import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { UserModel } from 'src/users/user.model';
import { Repository } from 'typeorm';
import AuthenticateDTO from './dto/AuthenticateDTO';
import { AuthType } from './dto/AuthType';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}

  async validateUser({ email, password }: AuthenticateDTO): Promise<AuthType> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    const validPassword = compareSync(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    return {
      user,
      token: 'token',
    };
  }
}
