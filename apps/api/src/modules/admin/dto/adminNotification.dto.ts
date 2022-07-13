import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminNotificationDto {
  @IsOptional()
  //TODO min date max date
  // @MinDate()
  @ApiProperty({
    required: false,
    format: '2021-02-12T09:26:25Z, 2021-02-12T09:26:25, 2021-02-12T09:26',
    example: '2021-02-12T09:26:25Z',
    description: 'Choose date when you want to notify drivers!',
  })
  when: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'New feature',
    description: 'Subject of a message',
  })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'From now paying for the ride is possible through paypal',
    description: 'Write your message',
  })
  message: string;
}
