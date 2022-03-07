import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CartModel } from './cart.model';
import { CartService } from './cart.service';

@Resolver()
export class CartResolver {
  constructor(@Inject(CartService) private cartService: CartService) {}

  @Query(() => CartModel)
  async cart(): Promise<CartModel> {
    const cart = await this.cartService.show();

    return cart;
  }

  @Mutation(() => CartModel)
  async updateCart(@Args('value') value: number) {
    const cart = await this.cartService.update(value);

    return cart;
  }
}
