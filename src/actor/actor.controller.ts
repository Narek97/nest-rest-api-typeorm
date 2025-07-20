import { Body, Controller, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorEntity } from './entities/actor.entity';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  async create(@Body() dto: CreateActorDto): Promise<ActorEntity> {
    return this.actorService.create(dto);
  }
}
