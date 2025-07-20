import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieEntity } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from '../actor/entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, ActorEntity])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
