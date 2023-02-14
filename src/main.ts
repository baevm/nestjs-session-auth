import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as createRedisStore from 'connect-redis'
import * as session from 'express-session'
import IoRedis from 'ioredis'
import { ValidationPipe } from '@nestjs/common'
import * as passport from 'passport'

const frontendUrl = 'http://localhost:3000'

const RedisStore = createRedisStore(session)
const redisClient = new IoRedis('redis://localhost:6379')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'TEST-SECRET-KEY',
      resave: false,
      saveUninitialized: false,
      name: 'sid',

      cookie: {
        sameSite: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    credentials: true,
    origin: frontendUrl,
  })

  await app.listen(5000)
}
bootstrap()
