import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionModel } from './permissions.model';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionModel)
    private permissionsRepository: Repository<PermissionModel>,
  ) {}
}
