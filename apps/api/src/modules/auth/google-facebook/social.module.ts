import {Module} from '@nestjs/common';
import {SocialController} from './social.controller';
import {SocialService} from './social.service';
import {GoogleStrategy} from './strategies/google.strategy';
import {JwtModule} from '@nestjs/jwt';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions: {
              expiresIn: process.env.JWT_ACCESS_EXP,
            },
        }),
    ],
    controllers: [SocialController],
    providers: [SocialService, GoogleStrategy, FacebookStrategy]
})

export class SocialModule{}