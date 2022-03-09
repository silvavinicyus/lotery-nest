import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthType } from './dto/AuthType';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Mutation(() => AuthType)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthType> {
    const response = await this.authService.validateUser({ email, password });

    return response;
  }
}
