import { Field, ObjectType } from '@nestjs/graphql';
import { GameModel } from 'src/games/games.model';
import { UserModel } from 'src/users/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('bets')
export class BetModel {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  secure_id: string;

  @Field()
  @Column()
  user_id: number;

  @Field()
  @Column()
  game_id: number;

  @Field()
  @Column()
  numbers: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => UserModel)
  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Field(() => GameModel)
  @ManyToOne(() => GameModel)
  @JoinColumn({ name: 'game_id' })
  game: GameModel;
}
