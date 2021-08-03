import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { redis } from './redis/redis';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client: redis as any,
      }),
      name: 'qid',
      secret: 'shsaudasiua',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8000);
}
bootstrap();
