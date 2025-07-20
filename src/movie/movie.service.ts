import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ActorEntity } from '../actor/entities/actor.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return this.movieRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const { actorIds, ...res } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });
    if (!actors && !actors.length) {
      throw new NotFoundException('One or more actors not found');
    }

    const movie = this.movieRepository.create({ ...res, actors });
    return this.movieRepository.save(movie);
  }

  async findOne(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['actors'],
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return movie;
  }

  async update(id: number, dto: UpdateMovieDto): Promise<MovieEntity> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    Object.assign(movie, dto);
    return this.movieRepository.save(movie);
  }

  async delete(id: number): Promise<MovieEntity> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return this.movieRepository.remove(movie);
  }
}
