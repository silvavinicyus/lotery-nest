import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartModel } from './cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartModel)
    private cartRepository: Repository<CartModel>,
  ) {}

  async show() {
    const allCarts = await this.cartRepository.find();

    const cart = allCarts[0];

    return cart;
  }

  async update(value: number) {
    const allCarts = await this.cartRepository.find();

    const cart = allCarts[0];

    cart.value = value;

    await this.cartRepository.save(cart);

    return cart;
  }
}
