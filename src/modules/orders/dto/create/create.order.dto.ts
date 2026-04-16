import {
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsPositive,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  bookIds: number[];

  @IsOptional()
  @IsString()
  status?: string;
}
