import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import {SwaggerMessagesEnum, ValidationMessagesEnum} from '../../../../constants/messagesEnum';
import { MatchTwoFields } from '../../../../helpers/validators/matchTwoField.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @IsString({ message: ValidationMessagesEnum.NAME })
  @MaxLength(40, { message: ValidationMessagesEnum.NAME })
  @ApiProperty({
    example: 'Ivan',
    description: SwaggerMessagesEnum.DESCRIBE_NAME,
  })
  name: string;

  @IsString()
  @MaxLength(40)
  @ApiProperty({
    example: 'Pavlov',
    description: SwaggerMessagesEnum.DESCRIBE_SURNAME,
  })
  surname: string;

  @ApiProperty({
    title: 'Attachment',
    description: SwaggerMessagesEnum.DESCRIBE_PROFILE_IMAGE,
    type: 'file',
    required: false,
  })
  @IsOptional()
  profileImage: string;

  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, {
    message: ValidationMessagesEnum.EMAIL,
  })
  @ApiProperty({
    example: 'mymail@gmail.com',
    description: SwaggerMessagesEnum.DESCRIBE_EMAIL,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Password123@',
    description: SwaggerMessagesEnum.DESCRIBE_PASSWORD,
  })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,60}$/, {
    message: ValidationMessagesEnum.PASSWORD,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MatchTwoFields('password')
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,60}$/, {
    message:
      ValidationMessagesEnum.PASSWORD + ValidationMessagesEnum.CONFIRM_PASSWORD,
  })
  @ApiProperty({
    example: 'Password123@',
    description: SwaggerMessagesEnum.DESCRIBE_CONFIRM_PASSWORD,
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @ApiProperty({
    example: '+380632412233',
    description: SwaggerMessagesEnum.DESCRIBE_PHONE_NUMBER,
  })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  @ApiProperty({
    required: false,
    example: '+380632412233',
    description: SwaggerMessagesEnum.DESCRIBE_EMERGENCY_CONTACT,
  })
  emergencyContact: string;
}
