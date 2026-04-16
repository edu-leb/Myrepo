import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './service/books.services';
import { BooksController } from './controllers/books.controllers';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BooksController],
  providers: [Books],
  exports: [Books],
})
export class BooksModule {}
