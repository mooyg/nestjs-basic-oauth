"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const connectRedis = require("connect-redis");
const redis_1 = require("./redis/redis");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const RedisStore = connectRedis(session);
    app.use(session({
        store: new RedisStore({
            client: redis_1.redis,
        }),
        name: 'qid',
        secret: 'shsaudasiua',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map