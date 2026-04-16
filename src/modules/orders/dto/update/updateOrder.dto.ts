import { IsOptional, IsNumber, IsInt, Min, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  total_price?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  user_id?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
