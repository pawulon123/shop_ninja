import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import  configDb  from './config.db';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot(configDb()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}