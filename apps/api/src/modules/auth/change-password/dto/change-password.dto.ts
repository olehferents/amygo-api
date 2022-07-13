import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationMessagesEnum } from '../../../../constants/messagesEnum';
import { MatchTwoFields } from '../../../../helpers/validators/matchTwoField.decorator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,60}$/, {
    message: ValidationMessagesEnum.PASSWORD,
  })
  @ApiProperty({
    example: 'Password123@',
    type: String,

    description:
      'Password which consist of at least one Capital letter, one small, digit, and special symbol',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,60}$/, {
    message: ValidationMessagesEnum.PASSWORD,
  })
  @ApiProperty({
    example: 'NewPassword123##',
    type: String,
    description:
      'New Password which consist of at least one Capital letter, one small, digit, and special symbol',
  })
  readonly newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MatchTwoFields('newPassword')
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,60}$/, {
    message:
      ValidationMessagesEnum.PASSWORD + ValidationMessagesEnum.CONFIRM_PASSWORD,
  })
  @ApiProperty({
    example: 'NewPassword123##',
    type: String,
    description:
      'Password which consist of at least one Capital letter, one small, digit, and special symbol',
  })
  readonly confirmNewPassword: string;
}
