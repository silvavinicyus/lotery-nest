import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export default class UpdateUserDTO {
  @Field()
  @IsString()
  secure_id: string;

  @Field()
  @IsString()
  @IsEmail()
  email?: string;

  @Field()
  @IsString()
  name?: string;
}
