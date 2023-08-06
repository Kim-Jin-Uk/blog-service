import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities from '@/entities';

export const devTypeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'app_service',
  password: 'Jindol1!',
  database: 'posting_app_project',
  entities,
};
