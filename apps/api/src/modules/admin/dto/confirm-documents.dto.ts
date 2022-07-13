import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmDocumentsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '030b0c05-b4f2-4ef6-a1a4-4c16a1b85b70',
    description: 'user Id',
  })
  userId: string;
}
