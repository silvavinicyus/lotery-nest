import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@InputType()
export default class AuthenticateDTO {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
