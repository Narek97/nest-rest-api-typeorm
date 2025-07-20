import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1888) // The first film was made in 1888
  @Max(new Date().getFullYear())
  releaseYear: string;
}
