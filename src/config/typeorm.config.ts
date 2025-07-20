import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export async function getTypeOrmConfig(): Promise<TypeOrmModuleOptions> {
  return {
    type: 'postgres',
    host: process.env.PG_HOST || 'localhost',
    port: +process.env.PG_PORT || 5000,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    autoLoadEntities: true,
    synchronize: true,
  };
}
