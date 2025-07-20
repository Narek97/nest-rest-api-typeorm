import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from '../review/entities/review.entity';
import { ActorEntity } from './entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, ActorEntity])],
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
