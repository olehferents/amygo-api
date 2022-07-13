import { MaxLength, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Zelena, 108",
    description: "Place, where the user will be picked up"
  })
  readonly from: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Zelena, 108",
    description: "Place, which the user set as endpoint"
  })
  readonly where: string;
}
