import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { isDevelopment } from './env';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  url: String(process.env.DATABASE_URL),
  entities: [path.resolve(__dirname, 'entity', '*.entity.{js,ts}')],
  migrations: [path.resolve(__dirname, 'migrations', '**')],
  logging: false,
  extra: {
    ssl: !isDevelopment,
  },
});
