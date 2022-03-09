import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePermissionDTO from './dto/CreatePermissionDTO';
import UpdatePermissionDTO from './dto/UpdatePermissionDTO';
import { PermissionModel } from './permissions.model';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionModel)
    private permissionsRepository: Repository<PermissionModel>,
  ) {}

  async create({ secure_id, type }: CreatePermissionDTO) {
    const permission = this.permissionsRepository.create({
      secure_id,
      type,
    });

    await this.permissionsRepository.save(permission);

    return permission;
  }

  async index() {
    const permissions = await this.permissionsRepository.find();

    return permissions;
  }

  async findById(id: number) {
    const permission = await this.permissionsRepository.findOne({ id });

    return permission;
  }

  async findByType(type: string) {
    const permission = await this.permissionsRepository.findOne({ type });

    return permission;
  }

  async findBySecureId(secure_id: string) {
    const permission = await this.permissionsRepository.findOne({ secure_id });

    return permission;
  }

  async destroy(secure_id: string) {
    await this.permissionsRepository.delete({ secure_id });
  }

  async update({ secure_id, type }: UpdatePermissionDTO) {
    const permission = await this.permissionsRepository.findOne({ secure_id });

    permission.type = type;

    await this.permissionsRepository.save(permission);

    return permission;
  }
}
