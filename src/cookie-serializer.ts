import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CookieSerializer extends PassportSerializer {
  serializeUser(user: any, done): any {
    done(null, user);
  }
  deserializeUser(payload: any, done): any {
    done(null, payload);
  }
}
