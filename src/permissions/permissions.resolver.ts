import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PermissionModel } from './permissions.model';
import { PermissionsService } from './permissions.service';
import { v4 as uuidV4 } from 'uuid';

@Resolver('PermissionModel')
export class PermissionsResolver {
  constructor(
    @Inject(PermissionsService) private permissionsService: PermissionsService,
  ) {}

  @Query(() => [PermissionModel])
  async permissions(): Promise<PermissionModel[]> {
    const permissions = await this.permissionsService.index();

    return permissions;
  }

  @Query(() => PermissionModel)
  async permission(@Args('id') id: number): Promise<PermissionModel> {
    const permission = await this.permissionsService.findById(id);

    if (!permission) {
      throw new NotFoundException('Ther is no permission with the given id');
    }

    return permission;
  }

  @Mutation(() => PermissionModel)
  async createPermission(@Args('type') type: string) {
    const permissionExists = await this.permissionsService.findByType(type);

    if (permissionExists) {
      throw new ConflictException('Permission already exists');
    }

    const secure_id = uuidV4();

    const permission = await this.permissionsService.create({
      type,
      secure_id,
    });

    return permission;
  }

  @Mutation(() => String)
  async deletePermission(
    @Args('secure_id') secure_id: string,
  ): Promise<string> {
    const permissionExists = await this.permissionsService.findBySecureId(
      secure_id,
    );

    if (!permissionExists) {
      throw new NotFoundException('There is no permission with the given id');
    }

    await this.permissionsService.destroy(secure_id);

    return 'deleted';
  }

  @Mutation(() => PermissionModel)
  async updatePermission(
    @Args('secure_id') secure_id: string,
    @Args('type') type: string,
  ) {
    const permissionExists = await this.permissionsService.findBySecureId(
      secure_id,
    );

    if (!permissionExists) {
      throw new NotFoundException('There is no permission with the given id');
    }

    const permission = await this.permissionsService.update({
      secure_id,
      type,
    });

    return permission;
  }
}
