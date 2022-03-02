import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserService } from './users.service';
import { v4 as uuidV4 } from 'uuid';

@Resolver('UserModel')
export class UsersResolver {
  constructor(@Inject(UserService) private usersService: UserService) {}

  @Query(() => [UserModel])
  async users(): Promise<UserModel[]> {
    const users = await this.usersService.index();

    return users;
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserModel> {
    const secure_id = uuidV4();
    return await this.usersService.create({ name, email, password, secure_id });
  }
}
