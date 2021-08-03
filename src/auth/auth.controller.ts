import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth-guard';

@Controller('api/auth')
export class AuthController {
  @Get()
  authRoutes(): string {
    return 'Auth routes';
  }
  @Get('/github')
  @UseGuards(new LocalAuthGuard('github'))
  githubAuth() {}

  @Get('/callback')
  @UseGuards(new LocalAuthGuard('github'))
  githubAuthCallback(@Res() res: Response) {
    res.redirect('/');
  }
}
