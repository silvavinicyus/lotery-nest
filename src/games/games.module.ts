import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModel } from './games.model';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([GameModel])],
  providers: [GamesService, GamesResolver],
  exports: [GamesService],
})
export class GamesModule {}
