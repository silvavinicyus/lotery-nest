import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export default class CreateAuthorizationDTO {
  @Field()
  @IsNumber()
  user_id: number;

  @Field()
  @IsNumber()
  permission_id: number;
}
