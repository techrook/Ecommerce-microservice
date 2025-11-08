import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { User } from 'entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('DATABASE');
        return {
          type: 'postgres',
          host: dbConfig.HOST,
          port: dbConfig.PORT,
          username: dbConfig.USER,
          password: dbConfig.PASSWORD,
          database: dbConfig.NAME,
          entities: [User],
          synchronize: true, // disable in prod
        };
      },
    }),
    AuthModule, UsersModule],
    controllers: [],
  providers: [],
})
export class AppModule {}
