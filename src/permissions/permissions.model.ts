import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('permissions')
export class PermissionModel {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  secure_id: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
