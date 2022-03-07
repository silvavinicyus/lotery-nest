import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { BetModel } from './bets.model';
import CreateBetDTO from './dto/CreateBetDTO';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(BetModel)
    private betsRepository: Repository<BetModel>,
  ) {}

  async create({ game_id, user_id, numbers }: CreateBetDTO) {
    const secure_id = uuidV4();

    const bet = this.betsRepository.create({
      secure_id,
      game_id,
      user_id,
      numbers,
    });

    await this.betsRepository.save(bet);

    return bet;
  }

  async index() {
    const bets = await this.betsRepository.find({
      relations: ['user', 'game'],
    });

    return bets;
  }

  async show(id: number) {
    const bet = await this.betsRepository.findOne({
      relations: ['user', 'game'],
      where: { id },
    });

    return bet;
  }

  async destroy(secure_id: string) {
    await this.betsRepository.delete({ secure_id });
  }

  async findBySecureId(secure_id: string) {
    const bet = await this.betsRepository.findOne({
      relations: ['user', 'game'],
      where: { secure_id },
    });

    return bet;
  }
}
