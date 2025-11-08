// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import { Pool } from 'pg';

// Use require for CommonJS compatibility
const PgSession = require('connect-pg-simple')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const pool = new Pool({
    host: configService.get('DATABASE').HOST,
    port: configService.get('DATABASE').PORT,
    user: configService.get('DATABASE').USER,
    password: configService.get('DATABASE').PASSWORD,
    database: configService.get('DATABASE').NAME,
  });

  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: 'session',
        createTableIfMissing: true,
      }),
      name: 'sid',
      secret: configService.get('APP_SESSION_SECRET') || 'default_secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );

  const port = configService.get('port') || 3000;
  await app.listen(process.env.PORT ?? port);
  console.log(`🚀 Auth service running on port ${port}`);
}

bootstrap();