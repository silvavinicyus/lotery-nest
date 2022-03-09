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
import CreateGameDTO from './dto/CreateGameDTO';
import UpdateGameDTO from './dto/UpdateGameDTO';

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
  async createGame(@Args('input') input: CreateGameDTO): Promise<GameModel> {
    const gameExists = await this.gamesService.findByType(input.type);

    if (gameExists) {
      throw new ConflictException('This type of game is already used');
    }

    const secure_id = uuidV4();

    const game = await this.gamesService.create({
      secure_id,
      type: input.type,
      description: input.description,
      range: input.range,
      price: input.price,
      max_number: input.max_number,
      color: input.color,
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
  async updateGame(@Args('input') input: UpdateGameDTO): Promise<GameModel> {
    const gameExists = await this.gamesService.findBySecureId(input.secure_id);

    if (!gameExists) {
      throw new NotFoundException('There is no game with the given id');
    }

    const game = await this.gamesService.update({
      secure_id: input.secure_id,
      description: input.description,
      range: input.range,
      price: input.price,
      color: input.color,
    });

    return game;
  }
}
