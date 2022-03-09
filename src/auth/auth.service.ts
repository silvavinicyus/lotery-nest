import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthenticateDTO): Promise<AuthType> {
    const user = await this.usersRepository.findOne({
      relations: ['authorizations', 'authorizations.permission'],
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    const validPassword = compareSync(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: UserModel): Promise<string> {
    const payload = {
      id: user.id,
      name: user.name,
    };

    return this.jwtService.signAsync(payload);
  }
}
