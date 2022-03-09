import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from 'src/cart/cart.service';
import { GamesService } from 'src/games/games.service';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/users/users.service';
import { BetModel } from './bets.model';
import { BetsService } from './bets.service';
import { ICreateBetRequest } from './dto/ICreateBetRequestDTO';

@Resolver('bets')
export class BetsResolver {
  constructor(
    @Inject(BetsService)
    private betsService: BetsService,
    @Inject(GamesService)
    private gamesService: GamesService,
    @Inject(UserService)
    private usersService: UserService,
    @Inject(CartService)
    private cartService: CartService,
    @Inject(MailService)
    private mailService: MailService,
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

  @Mutation(() => [BetModel])
  async createBet(@Args('data') data: ICreateBetRequest): Promise<BetModel[]> {
    const betsCreated: BetModel[] = [];

    let totalValue = 0;

    for await (const bet of data.bets) {
      const { price } = await this.gamesService.show(bet.game_id);
      totalValue += price;
    }

    const cart = await this.cartService.show();

    if (totalValue >= cart.value) {
      for await (const bet of data.bets) {
        const gameExists = await this.gamesService.show(bet.game_id);

        if (!gameExists) {
          throw new NotFoundException('There is no game with the given id');
        }

        const userExists = await this.usersService.show(bet.user_id);

        if (!userExists) {
          throw new NotFoundException('There is no user with the given id');
        }
        const betCreated = await this.betsService.create(bet);

        betsCreated.push(betCreated);

        await this.mailService.sendNewBetMail({
          game: gameExists.type,
          numbers: bet.numbers,
          user: userExists,
          value: gameExists.price,
        });
      }
    } else {
      throw new BadRequestException(
        `Cart value must be minimum R$ ${cart.value.toLocaleString('pt-br', {
          minimumFractionDigits: 2,
        })}`,
      );
    }

    return betsCreated;
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
