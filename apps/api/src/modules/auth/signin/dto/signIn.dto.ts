import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationMessagesEnum } from '../../../../constants/messagesEnum';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'mymail@gmail.com / +380961112233',
    description: 'Correct email address/phone number',
  })
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,60}$/, {
    message:
      ValidationMessagesEnum.PASSWORD + ValidationMessagesEnum.CONFIRM_PASSWORD,
  })
  @ApiProperty({
    example: 'Password123@',
    description:
      'Password which consist of at least one Capital letter, one small, digit, and special symbol',
  })
  readonly password: string;
}
