import { Module } from '@nestjs/common';
import { CookieSerializer } from 'src/cookie-serializer';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies/github-strategy';

@Module({
  providers: [AuthService, GithubStrategy, PrismaService, CookieSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
