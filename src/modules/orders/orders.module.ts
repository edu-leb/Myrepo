import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders.controller';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { OrdersService } from './services/order.services';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Book])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
