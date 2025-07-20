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
import { StringToLowercasePipe } from '../../common/pipes/string-to-lowercase.pipe';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get all movies',
    description: 'Retrieve a list of all movies in the database.',
  })
  @Get()
  async findAll(): Promise<MovieEntity[]> {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Create a new movie',
    description: 'Add a new movie to the database.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Inception' },
        director: { type: 'string', example: 'Christopher Nolan' },
        releaseDate: { type: 'number', format: 'date', example: 2025 },
        genre: { type: 'string', example: 'Science Fiction' },
      },
    },
  })
  @Post('')
  async create(@Body() dto: MovieDto): Promise<MovieEntity> {
    return this.movieService.create(dto);
  }

  @ApiOperation({
    summary: 'Get a movie by ID',
    description: 'Retrieve a specific movie by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the movie',
    type: Number,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    example: 'Bearer your_token_here',
  })
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
