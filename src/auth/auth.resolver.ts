import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import AuthenticateDTO from './dto/AuthenticateDTO';
import { AuthType } from './dto/AuthType';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Mutation(() => AuthType)
  async login(@Args('data') data: AuthenticateDTO): Promise<AuthType> {
    const response = await this.authService.validateUser({
      email: data.email,
      password: data.password,
    });

    return response;
  }
}
