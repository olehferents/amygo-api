import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DateBetween } from '../../../helpers/validators/dateBetween';
import { ApiProperty } from '@nestjs/swagger';

export class PreorderTripDto {
  @IsOptional()
  @DateBetween()
  @ApiProperty({
    required: true,
    format: '2021-02-12T09:26:25Z, 2021-02-12T09:26:25, 2021-02-12T09:26',
    example: '2021-02-12T09:26:25Z',
    description:
      'Not sooner than 1 hour before the trip. No later than 1 week before trip',
  })
  when: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'London',
    description: 'Choose destination',
  })
  where: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Lviv',
    description: 'Choose your location',
  })
  from: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  @ApiProperty({
    required: true,
    example: 2,
    description: 'Specify how much people',
    minimum: 1,
    maximum: 7,
  })
  numberOfPeople: number;

  @IsOptional()
  userId: string;
}
