import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export default class CreateGameDTO {
  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  range: number;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  @IsNumber()
  max_number: number;

  @Field()
  @IsString()
  color: string;
}
