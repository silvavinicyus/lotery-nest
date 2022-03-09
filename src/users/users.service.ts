import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDTO from './dto/CreateUserDTO';
import CreateUserServiceDTO from './dto/CreateUserServiceDTO';
import UpdateUserDTO from './dto/UpdateUserDTO';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}

  async create({ email, password, name, secure_id }: CreateUserServiceDTO) {
    const user = this.usersRepository.create({
      name,
      password,
      email,
      secure_id,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async index() {
    const users = await this.usersRepository.find({
      relations: ['authorizations', 'authorizations.permission'],
    });

    return users;
  }

  async show(id: number) {
    const user = await this.usersRepository.findOne({
      relations: ['authorizations', 'authorizations.permission'],
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    return user;
  }

  async findBySecureId(secure_id: string) {
    const user = await this.usersRepository.findOne({ secure_id });

    return user;
  }

  async destroy(secure_id: string) {
    await this.usersRepository.delete({ secure_id });
  }

  async update({ secure_id, email, name }: UpdateUserDTO) {
    const user = await this.usersRepository.findOne({ secure_id });

    email ? (user.email = email) : '';
    name ? (user.name = name) : '';

    await this.usersRepository.save(user);

    return user;
  }
}
