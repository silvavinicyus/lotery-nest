import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { IsAdmin } from 'src/auth/admin.guard';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { AuthorizationModel } from './authorization.model';
import { AuthorizationService } from './authorization.service';

@Resolver()
export class AuthorizationResolver {
  constructor(
    @Inject(AuthorizationService)
    private authorizationService: AuthorizationService,
  ) {}

  @UseGuards(GqlAuthGuard, IsAdmin)
  @Query(() => [AuthorizationModel])
  async authorizations(): Promise<AuthorizationModel[]> {
    const authorizations = this.authorizationService.index();

    return authorizations;
  }

  @UseGuards(GqlAuthGuard, IsAdmin)
  @Query(() => AuthorizationModel)
  async authorization(@Args('id') id: number): Promise<AuthorizationModel> {
    const authorization = await this.authorizationService.show(id);

    return authorization;
  }

  @Mutation(() => AuthorizationModel)
  async createAuthorization(
    @Args('user_id') user_id: number,
    @Args('permission_id') permission_id: number,
  ) {
    const authorization = await this.authorizationService.create({
      user_id,
      permission_id,
    });

    return authorization;
  }

  @UseGuards(GqlAuthGuard, IsAdmin)
  @Mutation(() => String)
  async deleteAuthorization(
    @Args('secure_id') secure_id: string,
  ): Promise<string> {
    const authorizationExists = await this.authorizationService.findBySecureId(
      secure_id,
    );

    if (!authorizationExists) {
      throw new NotFoundException(
        'There is no authorization with the given id',
      );
    }

    await this.authorizationService.destroy(secure_id);

    return 'deleted';
  }
}
