import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {SocialService} from '../social.service';
import {Provider} from '../../../../constants/providers.enum';
import {VerifyCallback} from 'passport-oauth2';
import {Profile, Strategy} from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, Provider.FACEBOOK){
    constructor(
        private readonly socialService: SocialService,
    ){
        super({
            authorizationURL: "https://www.facebook.com/v9.0/dialog/oauth?client_id"+process.env.FACEBOOK_CLIENT_ID+"&redirect_uri=https://localhost/api/auth/facebook/redirect/",
            tokenURL: "https://graph.facebook.com/v9.0/oauth/access_token?client_id"+process.env.FACEBOOK_CLIENT_ID+"&redirect_uri=https://localhost/api/auth/facebook/redirect/",
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callback: 'https://localhost/api/auth/facebook/redirect',
            profileFields: ["email", "name"]
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any>{
        console.log(profile);
        const {emails, name} = profile;
        const jwt = await this.socialService.validateOAuthLogin(profile.id, Provider.FACEBOOK);
        const user = {
            emails: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName
        }

        const payload = {
            user,
            provider: Provider.FACEBOOK,
            jwt: jwt,
        }
        done(null, payload);
    }

}