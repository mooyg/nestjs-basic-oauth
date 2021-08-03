import { PassportSerializer } from '@nestjs/passport';
export declare class CookieSerializer extends PassportSerializer {
    serializeUser(user: any, done: any): any;
    deserializeUser(payload: any, done: any): any;
}
