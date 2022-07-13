import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersOrdersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'random uuid',
    description: `User's id`,
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 120,
    description: `Total price of items * quantities`,
  })
  totalPrice: number;
}
