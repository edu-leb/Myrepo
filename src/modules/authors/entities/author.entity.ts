import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'int', name: 'birth_year' })
  birthYear: number;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
