import * as path from 'path';
import { DataSource } from 'typeorm';
import { DATABASE_URL } from '@/config';
import { isDevelopment } from './env';

export const dataSource = new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  entities: [path.resolve(__dirname, 'entity', '*.entity.{js,ts}')],
  migrations: [path.resolve(__dirname, 'migrations', '**')],
  logging: false,
  extra: {
    ssl: !isDevelopment,
  },
});
