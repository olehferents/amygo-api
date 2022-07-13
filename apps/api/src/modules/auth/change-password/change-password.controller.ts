import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiPreconditionFailedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerMessagesEnum } from '../../../constants/messagesEnum';

@Controller('/:role/auth/change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({ name: 'role', enum: ['user', 'driver', 'merchant'] })
  @ApiNoContentResponse({
    description: 'Congrats, you successfully changed password!',
  })
  @ApiPreconditionFailedResponse({
    description: 'You should provide correct old password',
  })
  @ApiUnauthorizedResponse({
    description: SwaggerMessagesEnum.API_UNAUTHORIZED_RESPONSE,
  })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiForbiddenResponse({ description: 'Token should belongs to user' })
  public async changePassword(
    @Param('role') role: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res,
    @Req() req,
  ): Promise<void> {
    try {
      const { user } = req;
      const response = await this.changePasswordService.changePassword(
        changePasswordDto,
        user.id,
        role,
      );

      res.status(response.status).json({ message: response.message });
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        HttpStatus.BAD_REQUEST.toString(),
      );
    }
  }
}
