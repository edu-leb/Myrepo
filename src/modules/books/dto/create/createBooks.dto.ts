import { IsInt, IsString, IsNumber, Min, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsInt()
  book_id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  published_year: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsInt()
  author_id: number;

  @IsDateString()
  created_at: string;
}
