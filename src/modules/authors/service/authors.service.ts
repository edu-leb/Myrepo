import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';
import { CreateAuthorBody } from '../dto/create/createAuthor.body.dto';
import { UpdateAuthorBody } from '../dto/update/updateAuthor.body.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  findAll() {
    return this.authorsRepository.find({ relations: ['books'] });
  }

  async findOne(id: number) {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async create(body: CreateAuthorBody) {
    const author = this.authorsRepository.create(body);
    return this.authorsRepository.save(author);
  }

  async update(id: number, body: UpdateAuthorBody) {
    const author = await this.findOne(id);
    Object.assign(author, body);
    return this.authorsRepository.save(author);
  }

  async delete(id: number) {
    const author = await this.findOne(id);

    if (author.books?.length > 0) {
      throw new BadRequestException('Cannot delete author with existing books');
    }

    await this.authorsRepository.delete(id);
    return { message: 'Author deleted successfully' };
  }
}
