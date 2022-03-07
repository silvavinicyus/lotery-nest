import { Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GamesService } from 'src/games/games.service';
import { UserService } from 'src/users/users.service';
import { BetModel } from './bets.model';
import { BetsService } from './bets.service';

@Resolver('bets')
export class BetsResolver {
  constructor(
    @Inject(BetsService)
    private betsService: BetsService,
    @Inject(GamesService)
    private gamesService: GamesService,
    @Inject(UserService)
    private usersService: UserService,
  ) {}

  @Query(() => [BetModel])
  async bets(): Promise<BetModel[]> {
    const bets = await this.betsService.index();

    return bets;
  }

  @Query(() => BetModel)
  async bet(@Args('id') id: number) {
    const bet = await this.betsService.show(id);

    return bet;
  }

  @Mutation(() => BetModel)
  async createBet(
    @Args('game_id') game_id: number,
    @Args('user_id') user_id: number,
    @Args('numbers') numbers: string,
  ) {
    const gameExists = await this.gamesService.show(game_id);

    if (!gameExists) {
      throw new NotFoundException('There is no game with the given id');
    }

    const userExists = await this.usersService.show(user_id);

    if (!userExists) {
      throw new NotFoundException('There is no user with the given id');
    }

    const bet = await this.betsService.create({ game_id, numbers, user_id });

    return bet;
  }

  @Mutation(() => String)
  async deleteBet(@Args('secure_id') secure_id: string) {
    const betExists = await this.betsService.findBySecureId(secure_id);

    if (!betExists) {
      throw new NotFoundException('There is no bet with the given id');
    }

    await this.betsService.destroy(secure_id);

    return 'deleted';
  }
}
