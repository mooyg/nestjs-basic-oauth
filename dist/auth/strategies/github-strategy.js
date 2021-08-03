"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubStrategy = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_github2_1 = require("passport-github2");
const prisma_service_1 = require("../../prisma.service");
let GithubStrategy = class GithubStrategy extends passport_1.PassportStrategy(passport_github2_1.Strategy, 'github') {
    constructor(_prismaService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: '/api/auth/callback',
            scope: ['user:email'],
        }, async (_accessToken, _refreshToken, profile, done) => {
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
            }
            catch (e) {
                return done(e, undefined);
            }
        });
        this._prismaService = _prismaService;
    }
    async validate(_request, _accessToken, _refreshToken, profile) {
        return profile;
    }
};
GithubStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GithubStrategy);
exports.GithubStrategy = GithubStrategy;
//# sourceMappingURL=github-strategy.js.map