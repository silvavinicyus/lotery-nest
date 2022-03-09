import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString } from 'class-validator';

@InputType()
export class IBetInterface {
  @Field()
  @IsNumber()
  game_id: number;

  @Field()
  @IsNumber()
  user_id: number;

  @IsString()
  @Field()
  numbers: string;
}

@InputType()
export class ICreateBetRequest {
  @Field(() => [IBetInterface])
  @IsArray()
  bets: IBetInterface[];
}
