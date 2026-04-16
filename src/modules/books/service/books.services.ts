import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { UpdateBookDto } from '../dto/update/updateBooks.dto';
import { CreateBookDto } from '../dto/create/createBooks.dto';

@Injectable()
export class Books {
  constructor(
    @InjectRepository(Book)
    private readonly Books: Repository<Book>,
  ) {}

  create(dto: CreateBookDto) {
    const book = this.Books.create(dto);
    return this.Books.save(book);
  }

  findAll() {
    return this.Books.find();
  }

  async findOne(id: number) {
    const book = await this.Books.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    const book = await this.findOne(id);
    Object.assign(book, dto);
    return this.Books.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return this.Books.remove(book);
  }
}
