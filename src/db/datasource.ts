import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  // @ts-expect-error // TypeORM expects predefined strings for type
  type: configService.getOrThrow<string>('DB_TYPE') || 'postgres',
  host: configService.getOrThrow<string>('PG_HOST'),
  port: configService.getOrThrow<number>('PG_PORT'),
  username: configService.getOrThrow<string>('PG_USER'),
  password: configService.getOrThrow<string>('PG_PASSWORD'),
  database: configService.getOrThrow<string>('PG_DB'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: process.env.ENV !== 'production',
  logging: process.env.ENV !== 'production',
  extra: {
    connectionLimit: 10, // Adjust based on your database connection pool requirements
  },
};

const dataSource = new DataSource(dataSourceOptions);

// You might want to do
// dataSource.initialize()
// but I found mine working regardless of it

export default dataSource;

//yarn migration:generate -- src/db/migrations/<whatever name you wanna give>
