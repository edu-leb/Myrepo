import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  published_year: number;

  @Column()
  stock: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @Column()
  author_id: number;

  @ManyToMany(() => Order, (order) => order.books)
  orders: Order[];
}
