import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export default class UpdateGameDTO {
  @Field()
  @IsString()
  secure_id: string;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  @IsNumber()
  range: number;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  color: string;
}
