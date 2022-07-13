import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SignUpService } from './signUp.service';
import { SignupUserDto } from './dto/signupUser.dto';
import { SignupDriverDto } from './dto/signupDriver.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessagesEnum } from '../../../constants/messagesEnum';
import { FileUploadService } from '../../file-upload';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { SignupMerchantDto } from './dto/signup.merchant.dto';
import { SwaggerMessagesEnum } from '../../../constants/messagesEnum';

@ApiConflictResponse({ description: 'Email or phoneNumber already exists!' })
@ApiBadRequestResponse({
  description: SwaggerMessagesEnum.API_BAD_REQUEST_RESPONSE,
})
@ApiPayloadTooLargeResponse({
  description: SwaggerMessagesEnum.API_PAYLOAD_TOO_LARGE_RESPONSE,
})
@ApiUnsupportedMediaTypeResponse({
  description: SwaggerMessagesEnum.API_UNSUPPORTED_MEDIA_TYPE_RESPONSE,
})
@UseInterceptors(FileInterceptor('profileImage'))
@ApiConsumes('multipart/form-data')
@Controller('/auth/signUp')
export class SignupController {
  constructor(
    private readonly signupService: SignUpService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post('user')
  @ApiCreatedResponse({ description: 'Successfully created new user!' })
  @ApiTags('user')
  public async registerUser(
    @Res() res,
    @UploadedFile() profileImage,
    @Body() signupUserDto: SignupUserDto,
  ): Promise<void> {
    try {
      if (profileImage) {
        this.fileUploadService.isFileValid(profileImage);
        profileImage.originalname = Date.now() + profileImage.originalname;
        signupUserDto.profileImage =
          process.env.S3_BUCKET_URL + profileImage.originalname;
      }
      await this.signupService.signupUser(signupUserDto);

      if (profileImage) {
        await this.fileUploadService.upload(
          profileImage,
          process.env.S3_BUCKET_NAME_PROFILE_IMAGES,
        );
      }

      res.status(HttpStatus.CREATED).json({
        message: MessagesEnum.NEW_USER_CREATED,
      });
    } catch (err) {
      res
        .status(err.status || HttpStatus.CONFLICT)
        .json({ message: err.detail || err.message });
    }
  }

  @Post('driver')
  @ApiCreatedResponse({ description: 'Successfully created new driver!' })
  @ApiTags('driver')
  public async registerDriver(
    @Res() res,
    @UploadedFile() profileImage,
    @Body() signupDriverDto: SignupDriverDto,
  ): Promise<void> {
    try {
      if (profileImage) {
        this.fileUploadService.isFileValid(profileImage);
        profileImage.originalname = Date.now() + profileImage.originalname;
        signupDriverDto.profileImage =
          process.env.S3_BUCKET_URL + profileImage.originalname;
      }
      await this.signupService.signupDriver(signupDriverDto);

      if (profileImage) {
        await this.fileUploadService.upload(
          profileImage,
          process.env.S3_BUCKET_NAME_PROFILE_IMAGES,
        );
      }

      res.status(HttpStatus.CREATED).json({
        message: MessagesEnum.NEW_DRIVER_CREATED,
      });
    } catch (err) {
      res
        .status(err.status || HttpStatus.CONFLICT)
        .json({ message: err.detail || err.message });
    }
  }

  @Post('merchant')
  @ApiCreatedResponse({ description: 'Successfully created new merchant!' })
  @ApiTags('merchant')
  public async registerMerchant(
    @Res() res,
    @UploadedFile() profileImage,
    @Body() signupMerchantDto: SignupMerchantDto,
  ): Promise<void> {
    try {
      if (profileImage) {
        this.fileUploadService.isFileValid(profileImage);
        profileImage.originalname = Date.now() + profileImage.originalname;
        signupMerchantDto.profileImage =
          process.env.S3_BUCKET_URL + profileImage.originalname;
      }
      await this.signupService.signupMerchant(signupMerchantDto);

      if (profileImage) {
        await this.fileUploadService.upload(
          profileImage,
          process.env.S3_BUCKET_NAME_PROFILE_IMAGES,
        );
      }

      res.status(HttpStatus.CREATED).json({
        message: MessagesEnum.NEW_MERCHANT_CREATED,
      });
    } catch (err) {
      res
        .status(err.status || HttpStatus.CONFLICT)
        .json({ message: err.detail || err.message });
    }
  }
}
