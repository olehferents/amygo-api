import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcceptPreorderTripDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'a0ece234-5dea-42b5-bd72-834f03ba81e9',
    description: 'Specify which trip you agree to take',
  })
  preorderTripId: string;
}
