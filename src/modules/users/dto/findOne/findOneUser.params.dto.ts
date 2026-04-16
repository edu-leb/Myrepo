import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class FindOneUserParamsDto {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  id: number;
}
