import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationMessagesEnum } from '../../../constants/messagesEnum';

export class ChangeProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(40)
  @ApiProperty({
    example: 'John',
    required: false,
    description: 'Correct name shorter than 40 characters',
  })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  @ApiProperty({
    example: 'Rock',
    required: false,
    description: 'Correct surname shorter than 40 characters',
  })
  surname: string;

  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, {
    message: ValidationMessagesEnum.EMAIL,
  })
  @ApiProperty({
    required: false,
    example: 'mymail@gmail.com',
    description: 'Correct email address',
  })
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({
    type: 'file',
    required: false,
    description:
      'file with extension [jpg, jpeg, png, svg, tiff, webp] and size less than 6Mb',
  })
  profileImage: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  @ApiProperty({
    example: '+20554516845',
    required: false,
    description: 'Correct phone number, less than 15 characters',
  })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  @ApiProperty({
    example: '+20554516845',
    required: false,
    description: 'Correct phone number, less than 15 characters',
  })
  emergencyContact: string;
}
