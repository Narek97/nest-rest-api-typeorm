import { IsNotEmpty } from 'class-validator';

export class CreateActorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surName: string;
}
