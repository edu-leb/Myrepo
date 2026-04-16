import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateAuthorBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  country: string;

  @IsInt()
  @Min(0)
  birthYear: number;
}
