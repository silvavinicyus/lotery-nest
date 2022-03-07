import { Field, ObjectType } from '@nestjs/graphql';
import { AuthorizationModel } from 'src/authorization/authorization.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class UserModel {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column()
  secure_id: string;

  @Field()
  @Column({ nullable: false, unique: true })
  name: string;

  @Field()
  @Column({ nullable: false, unique: true })
  email: string;

  @Field()
  @Column({ nullable: false })
  password: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => [AuthorizationModel], {})
  @OneToMany(() => AuthorizationModel, (auth) => auth.user)
  @JoinColumn({ name: 'user_id' })
  authorizations: AuthorizationModel[];
}
