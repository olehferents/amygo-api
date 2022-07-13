import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { SignInService } from './signIn.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/:role/auth/signIn')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  @ApiParam({ name: 'role', enum: ['user', 'driver', 'merchant'] })
  @ApiBadRequestResponse({ description: 'Email/phone number should be valid' })
  @ApiOkResponse({ description: 'Successfully signed in' })
  @ApiNotFoundResponse({
    description: 'This email/phone number is not registered yet',
  })
  @ApiUnauthorizedResponse({
    description: 'Email/phone number or password is incorrect!',
  })
  public async signIn(
    @Param('role') role: string,
    @Body() signInUserDto: SignInDto,
    @Res() res,
  ): Promise<void> {
    try {
      const response = await this.signInService.signIn(signInUserDto, role);

      res
        .status(response.status)
        .json({ message: response.message, accessToken: response.accessToken });
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  }
}
