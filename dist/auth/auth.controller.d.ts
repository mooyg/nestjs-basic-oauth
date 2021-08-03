import { Response } from 'express';
export declare class AuthController {
    authRoutes(): string;
    githubAuth(): void;
    githubAuthCallback(res: Response): void;
}
