
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => {
  let { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    return {
    type: 'mysql',
    host: DB_HOST,
    port: 3307,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [],
    synchronize: false,
  }
}  