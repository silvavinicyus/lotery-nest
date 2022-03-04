import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('user_permissions')
export class AuthorizationModel {
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
  permission_id: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
