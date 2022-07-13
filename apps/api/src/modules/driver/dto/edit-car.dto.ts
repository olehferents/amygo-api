import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditCarDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Ford',
    description: 'Brand of the car',
  })
  brand: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Focus',
    description: 'Model of the car',
  })
  model: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Blue',
    description: 'Color of the car',
  })
  color: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'AA0000AA',
    description: 'Car number',
  })
  carNumber: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Classic',
    description: 'Type of the car',
  })
  carType: string;
}
