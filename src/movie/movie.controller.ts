import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieEntity } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { StringToLowercasePipe } from '../common/pipes/string-to-lowercase.pipe';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<MovieEntity[]> {
    return this.movieService.findAll();
  }

  @Post('')
  async create(@Body() dto: MovieDto): Promise<MovieEntity> {
    return this.movieService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MovieEntity> {
    return this.movieService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    return this.movieService.update(Number(id), dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<MovieEntity> {
    return this.movieService.delete(Number(id));
  }

  @UsePipes(StringToLowercasePipe)
  @Post('/pipe')
  async testPipe(@Body() text: string) {
    return text;
  }
}
