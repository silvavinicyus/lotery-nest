import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModel } from 'src/games/games.model';
import { UserModel } from 'src/users/user.model';
import { BetModel } from './bets.model';
import { BetsService } from './bets.service';
import { BetsResolver } from './bets.resolver';
import { GamesModule } from 'src/games/games.module';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BetModel]), GamesModule, UserModule],
  providers: [BetsService, BetsResolver],
  exports: [BetsService],
})
export class BetsModule {}
