import { Module } from '@nestjs/common';
import { SignInModule } from './signin/signIn.module';
import { SignUpModule } from './signup/signUp.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { SocialModule } from './google-facebook/social.module';

@Module({
  imports: [SignInModule, SignUpModule, ChangePasswordModule, SocialModule],
  exports: [SignInModule, SignUpModule, ChangePasswordModule, SocialModule],
})
export class AuthModule {}
