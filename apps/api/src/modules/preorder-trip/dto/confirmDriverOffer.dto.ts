import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmDriverOfferDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Driver id',
    required: false,
    example: 'bd597794-a2e1-4199-8cea-bb10c15f0d63',
  })
  driverId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Preorder trip id',
    required: false,
    example: 'bd597794-a2e1-4199-8cea-bb10c15f0d63',
  })
  preorderTripId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'User id',
    required: false,
    example: 'bd597794-a2e1-4199-8cea-bb10c15f0d63',
  })
  userId: string;
}
