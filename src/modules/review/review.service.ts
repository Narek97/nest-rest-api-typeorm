import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly movieService: MovieService, // Assuming MovieService is needed for some operations
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    const movie = await this.movieService.findOne(createReviewDto.movieId);

    const review = this.reviewRepository.create({ ...createReviewDto, movie });
    return this.reviewRepository.save(review);
  }
}
