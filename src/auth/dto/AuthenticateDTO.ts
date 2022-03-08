import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class AuthenticateDTO {
  @Field()
  email: string;

  @Field()
  password: string;
}
