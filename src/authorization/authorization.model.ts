import { Field, ObjectType } from '@nestjs/graphql';
import { PermissionModel } from 'src/permissions/permissions.model';
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

  @Field(() => UserModel)
  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Field(() => PermissionModel)
  @ManyToOne(() => PermissionModel)
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionModel;
}
