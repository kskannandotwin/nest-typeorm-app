import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { DataItem } from './data/entities/data.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'nestjs_typeorm_db',
  entities: [User, DataItem],
  synchronize: false, // Set to false to avoid accidental schema sync
});
