import {Module} from '@nestjs/common';
import {UsersController} from "./users/controllers/users.controller";
import {UsersService} from "./users/services/users.services";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        autoLoadEntities: true,
        database: 'postgres',
        synchronize: true,
        }),
      UsersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
