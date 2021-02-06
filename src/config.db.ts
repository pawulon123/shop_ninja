
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => {
  let { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    return {
    type: 'mysql',
    host: DB_HOST,
    port: parseInt(DB_PORT,10),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false
  }
}  
