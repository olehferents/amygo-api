import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Provider} from '../../../constants/providers.enum';

@Injectable()
export class SocialService{
    constructor(
        private readonly jwtService: JwtService
    ){}
    socialLogin(req){
        if(!req.user){
            return 'No user from ' + req.provider
        }
        return {
            message: 'User ' + req.user.provider + ' info',
            user: req.user
        }
    }

    async validateOAuthLogin(userId: string, provider: Provider){
        try{
            const payload = {
                userId,
                provider
            };
            const jwt: string = this.jwtService.sign(payload);
            return await jwt;
        } catch(err) {
            throw new InternalServerErrorException('validateOAuthException', err.message)
        }

    }
}