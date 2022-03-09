import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';
import { GamesModule } from 'src/games/games.module';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/users/users.module';
import { BetModel } from './bets.model';
import { BetsResolver } from './bets.resolver';
import { BetsService } from './bets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BetModel]),
    GamesModule,
    UserModule,
    CartModule,
    MailModule,
  ],
  providers: [BetsService, BetsResolver],
  exports: [BetsService],
})
export class BetsModule {}
