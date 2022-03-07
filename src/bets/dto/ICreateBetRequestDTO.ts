import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IBetInterface {
  @Field()
  game_id: number;

  @Field()
  user_id: number;

  @Field()
  numbers: string;
}

@InputType()
export class ICreateBetRequest {
  @Field(() => [IBetInterface])
  bets: IBetInterface[];
}
