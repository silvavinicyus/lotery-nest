import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/user.model';

@ObjectType()
export class AuthType {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  token: string;
}
