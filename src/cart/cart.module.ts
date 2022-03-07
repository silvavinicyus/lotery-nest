import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModel } from './cart.model';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CartModel])],
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CartModule {}
