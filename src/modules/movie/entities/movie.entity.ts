import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewEntity } from '../../review/entities/review.entity';
import { ActorEntity } from '../../actor/entities/actor.entity';

enum MovieGenre {
  ACTION = 'Action',
  COMEDY = 'Comedy',
  DRAMA = 'Drama',
  HORROR = 'Horror',
  ROMANCE = 'Romance',
  THRILLER = 'Thriller',
  ANIMATION = 'Animation',
  DOCUMENTARY = 'Documentary',
  FANTASY = 'Fantasy',
}

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  description: string;

  @Column({
    // name: 'release_year',
    type: 'int',
    unsigned: true,
  })
  releaseYear: string;

  @Column({
    // name: 'is_available',
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0.0,
  })
  rating: number;

  @Column({ default: false })
  isAvailable: boolean;

  @Column({
    type: 'enum',
    enum: MovieGenre,
    default: MovieGenre.ACTION,
  })
  genre: MovieGenre;

  @OneToMany(() => ReviewEntity, (review: ReviewEntity) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
