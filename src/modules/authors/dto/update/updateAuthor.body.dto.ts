import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdateAuthorBody {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  birthYear: number;
}
