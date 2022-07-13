import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodOrder } from '../user/entities/foodOrder.entity';

@Injectable()
export class FoodOrderService {
  constructor(
    @InjectRepository(FoodOrder)
    private foodOrderRepository: Repository<FoodOrder>,
  ) {}

  async findAllOrders() {
    const orders = await this.foodOrderRepository.find();
    return orders;
  }
}
