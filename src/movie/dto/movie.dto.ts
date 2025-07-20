import { IsArray, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888) // The first film was made in 1888
  @Max(new Date().getFullYear())
  releaseYear: string;

  @IsArray()
  @IsInt({ each: true })
  actorIds: number[];
}
