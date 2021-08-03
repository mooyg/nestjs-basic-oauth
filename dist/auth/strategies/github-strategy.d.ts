import 'dotenv/config';
import { PrismaService } from 'src/prisma.service';
declare const GithubStrategy_base: new (...args: any[]) => any;
export declare class GithubStrategy extends GithubStrategy_base {
    private readonly _prismaService;
    constructor(_prismaService: PrismaService);
    validate(_request: any, _accessToken: string, _refreshToken: string, profile: any): Promise<any>;
}
export {};
