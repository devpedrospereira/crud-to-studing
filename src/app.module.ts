import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { PersonModule } from './modules/person.module';

@Module({
  imports: [
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'crud-to-studing',
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entities.js'],
    }),
  ],
})
export class AppModule {}
