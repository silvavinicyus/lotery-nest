import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionModel } from 'src/permissions/permissions.model';
import { UserModel } from 'src/users/user.model';
import { Repository } from 'typeorm';
import { AuthorizationModel } from './authorization.model';
import CreateAuthorizationDTO from './dto/CreateAuthorizationDTO';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(AuthorizationModel)
    private authorizationsRepository: Repository<AuthorizationModel>,
    @InjectRepository(PermissionModel)
    private permissionsRepository: Repository<PermissionModel>,
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}

  async create({ user_id, permission_id }: CreateAuthorizationDTO) {
    const permissionExists = await this.permissionsRepository.findOne({
      id: permission_id,
    });

    const userExists = await this.usersRepository.findOne({ id: user_id });

    if (!userExists) {
      throw new NotFoundException('There is no user with the given id');
    }

    if (!permissionExists) {
      throw new NotFoundException('There is no permission with the given id');
    }

    const secure_id = uuidV4();

    const authorization = this.authorizationsRepository.create({
      user_id,
      secure_id,
      permission_id,
    });

    await this.authorizationsRepository.save(authorization);

    return authorization;
  }

  async index() {
    const authorizations = await this.authorizationsRepository.find();

    return authorizations;
  }

  async show(id: number) {
    const authorization = await this.authorizationsRepository.findOne({ id });

    if (!authorization) {
      throw new NotFoundException(
        'There is no authorization with the given id',
      );
    }

    return authorization;
  }

  async destroy(secure_id: string) {
    await this.authorizationsRepository.delete({ secure_id });
  }

  async findBySecureId(secure_id: string) {
    const authorization = await this.authorizationsRepository.findOne({
      secure_id,
    });

    return authorization;
  }
}
