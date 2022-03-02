import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDTO from './dto/CreateUserDTO';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}

  async create({ email, password, name, secure_id }: CreateUserDTO) {
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
    const users = await this.usersRepository.find();

    return users;
  }
}
