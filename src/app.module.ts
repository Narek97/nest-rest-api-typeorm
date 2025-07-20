import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './modules/movie/movie.module';
import { ReviewModule } from './modules/review/review.module';
import { ActorModule } from './modules/actor/actor.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { dataSourceOptions } from './db/datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      cache: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    MovieModule,
    ReviewModule,
    ActorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply LoggerMiddleware to all routes
  }
}
