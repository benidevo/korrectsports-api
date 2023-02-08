import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as path from 'path';

const basePath = path.resolve(__dirname, '..');
const entities = path.join(basePath + '/*/entities/*.entity.{ts,js}');
const nestedEntities = path.join(
  basePath + '/*/*//*/entities/*.entity.{ts,js}',
);

export const TypeOrmOptions: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  entities: [entities, nestedEntities],
};

const dataSource = new DataSource(TypeOrmOptions);

export default dataSource;
