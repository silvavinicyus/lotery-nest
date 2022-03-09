import {
  ConflictException,
  Inject,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GameModel } from './games.model';
import { GamesService } from './games.service';
import { v4 as uuidV4 } from 'uuid';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { IsAdmin } from 'src/auth/admin.guard';

@Resolver('GameModel')
export class GamesResolver {
  constructor(@Inject(GamesService) private gamesService: GamesService) {}

  @Query(() => [GameModel])
  async games(): Promise<GameModel[]> {
    const games = await this.gamesService.index();

    return games;
  }

  @Query(() => GameModel)
  async game(@Args('id') id: number): Promise<GameModel> {
    const gameExists = await this.gamesService.show(id);

    if (!gameExists) {
      throw new NotFoundException('There is no game with the given id');
    }
    return gameExists;
  }

  @UseGuards(GqlAuthGuard, IsAdmin)
  @Mutation(() => GameModel)
  async createGame(
    @Args('type') type: string,
    @Args('description') description: string,
    @Args('range') range: number,
    @Args('price') price: number,
    @Args('max_number') max_number: number,
    @Args('color') color: string,
  ): Promise<GameModel> {
    const gameExists = await this.gamesService.findByType(type);

    if (gameExists) {
      throw new ConflictException('This type of game is already used');
    }

    const secure_id = uuidV4();

    const game = await this.gamesService.create({
      secure_id,
      type,
      description,
      range,
      price,
      max_number,
      color,
    });

    return game;
  }

  @UseGuards(GqlAuthGuard, IsAdmin)
  @Mutation(() => String)
  async deleteGame(@Args('secure_id') secure_id: string): Promise<string> {
    const gameExists = await this.gamesService.findBySecureId(secure_id);

    if (!gameExists) {
      throw new NotFoundException('There is no game with the given id');
    }

    await this.gamesService.destroy(secure_id);

    return 'deleted';
  }

  @UseGuards(GqlAuthGuard, IsAdmin)
  @Mutation(() => GameModel)
  async updateGame(
    @Args('secure_id') secure_id: string,
    @Args('description') description: string,
    @Args('range') range: number,
    @Args('price') price: number,
    @Args('color') color: string,
  ): Promise<GameModel> {
    const gameExists = await this.gamesService.findBySecureId(secure_id);

    if (!gameExists) {
      throw new NotFoundException('There is no game with the given id');
    }

    const game = await this.gamesService.update({
      secure_id,
      description,
      range,
      price,
      color,
    });

    return game;
  }
}
