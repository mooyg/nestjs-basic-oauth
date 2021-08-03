import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly _prismaService: PrismaService) {
    super(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/api/auth/callback',
        scope: ['user:email'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        console.log(profile);
        const findUser = await this._prismaService.user.findFirst({
          where: {
            email: profile.email,
          },
        });
        if (findUser) {
          console.log('Already exists');
          return done(null, findUser);
        }
        console.log(profile);
        try {
          const User = await this._prismaService.user.create({
            data: {
              username: profile.username,
              email: profile.email,
              avatar: profile._json.avatar_url,
            },
          });
          return done(null, User);
        } catch (e) {
          return done(e, undefined);
        }
      },
    );
  }
  async validate(
    _request: any,
    _accessToken: string,
    _refreshToken: string,
    profile,
  ) {
    return profile;
  }
}
