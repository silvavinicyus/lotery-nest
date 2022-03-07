import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateGameDTO from './dto/CreateGameDTO';
import UpdateGameDTO from './dto/UpdateGameDTO';
import { GameModel } from './games.model';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameModel)
    private gamesRepository: Repository<GameModel>,
  ) {}

  async create({
    secure_id,
    type,
    description,
    range,
    price,
    max_number,
    color,
  }: CreateGameDTO) {
    const game = this.gamesRepository.create({
      secure_id,
      type,
      description,
      range,
      price,
      max_number,
      color,
    });

    await this.gamesRepository.save(game);

    return game;
  }

  async index() {
    const games = await this.gamesRepository.find();

    return games;
  }

  async findByType(type: string) {
    const game = await this.gamesRepository.findOne({ type });

    return game;
  }

  async show(id: number) {
    const game = await this.gamesRepository.findOne({ id });

    return game;
  }

  async findBySecureId(secure_id: string) {
    const game = await this.gamesRepository.findOne({ secure_id });

    return game;
  }

  async destroy(secure_id: string) {
    await this.gamesRepository.delete({ secure_id });
  }

  async update({ secure_id, price, range, description, color }: UpdateGameDTO) {
    const game = await this.gamesRepository.findOne({ secure_id });

    game.price = price;
    game.range = range;
    game.description = description;
    game.color = color;

    await this.gamesRepository.save(game);

    return game;
  }
}
