import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from '../entities/order.entity';
import { User, UserRole } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';
import { CreateOrderDto } from '../dto/create/create.order.dto';
import { AuthUser } from '../../auth/types/auth-user.type';
import { UpdateOrderDto } from '../dto/update/updateOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(currentUser: AuthUser, dto: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOne({
      where: { id: currentUser.id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${currentUser.id} not found`);
    }

    const books = await this.booksRepository.find({
      where: { id: In(dto.bookIds) },
    });

    if (books.length !== dto.bookIds.length) {
      throw new NotFoundException('One or more books not found');
    }

    const totalPrice = books.reduce((sum, book) => sum + Number(book.price), 0);

    const order = this.ordersRepository.create({
      userId: user.id,
      user,
      books,
      totalPrice,
      status: dto.status || 'pending',
      createdAt: new Date(),
    });

    return this.ordersRepository.save(order);
  }

  async findAllForUser(currentUser: AuthUser): Promise<Order[]> {
    if (currentUser.role === UserRole.Admin) {
      return this.ordersRepository.find({
        relations: ['user', 'books', 'books.author'],
      });
    }

    return this.ordersRepository.find({
      where: { userId: currentUser.id },
      relations: ['user', 'books', 'books.author'],
    });
  }

  async findOneForUser(id: number, currentUser: AuthUser): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'books', 'books.author'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (
      currentUser.role !== UserRole.Admin &&
      order.userId !== currentUser.id
    ) {
      throw new ForbiddenException('You cannot access this order');
    }

    return order;
  }

  async updateForUser(
    id: number,
    currentUser: AuthUser,
    updateData: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.findOneForUser(id, currentUser);

    if (currentUser.role !== UserRole.Admin) {
      updateData = {
        status: updateData.status ?? order.status,
      };
    }

    await this.ordersRepository.update(id, updateData);
    return this.findOneForUser(id, currentUser);
  }

  async removeForUser(id: number, currentUser: AuthUser): Promise<void> {
    const order = await this.findOneForUser(id, currentUser);

    if (
      currentUser.role !== UserRole.Admin &&
      order.userId !== currentUser.id
    ) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.ordersRepository.delete(id);
  }
}
