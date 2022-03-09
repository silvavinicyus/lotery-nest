import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserService } from './users.service';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';
import { PermissionsService } from 'src/permissions/permissions.service';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { IsAdmin } from 'src/auth/admin.guard';

@Resolver('UserModel')
export class UsersResolver {
  constructor(
    @Inject(UserService) private usersService: UserService,
    @Inject(PermissionsService) private permissionsService: PermissionsService,
    @Inject(AuthorizationService)
    private authorizationService: AuthorizationService,
  ) {}

  @UseGuards(GqlAuthGuard, IsAdmin)
  @Query(() => [UserModel])
  async users(): Promise<UserModel[]> {
    const users = await this.usersService.index();

    return users;
  }

  @Query(() => UserModel)
  async user(@Args('id') id: number): Promise<UserModel> {
    const user = await this.usersService.show(id);

    if (!user) {
      throw new NotFoundException('There is no user with the given id');
    }

    return user;
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserModel> {
    const userExists = await this.usersService.findByEmail(email);

    if (userExists) {
      throw new BadRequestException('This email is already used');
    }

    const secure_id = uuidV4();
    const passwordHash = await hash(password, 10);

    const user = await this.usersService.create({
      name,
      email,
      password: passwordHash,
      secure_id,
    });
    console.log(user.id);

    const permission = await this.permissionsService.findByType('player');

    await this.authorizationService.create({
      user_id: user.id,
      permission_id: permission.id,
    });

    return user;
  }

  @Mutation(() => String)
  async deleteUser(@Args('secure_id') secure_id: string): Promise<string> {
    const userExists = await this.usersService.findBySecureId(secure_id);

    if (!userExists) {
      throw new NotFoundException('There is no user with the given id');
    }

    await this.usersService.destroy(secure_id);

    return 'deleted';
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Args('secure_id') secure_id: string,
    @Args('email') email: string,
    @Args('name') name: string,
  ) {
    const userExists = await this.usersService.findBySecureId(secure_id);

    if (!userExists) {
      throw new NotFoundException('There is no user with the given id');
    }

    const emailUsed = await this.usersService.findByEmail(email);

    if (emailUsed && emailUsed.email !== userExists.email) {
      throw new ConflictException('Email already used');
    }

    const userUpdated = await this.usersService.update({
      secure_id,
      name,
      email,
    });

    return userUpdated;
  }
}
