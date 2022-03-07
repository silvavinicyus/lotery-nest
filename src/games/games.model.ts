import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('games')
export class GameModel {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column()
  secure_id: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  range: number;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  max_number: number;

  @Field()
  @Column()
  color: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
