import { IsString, IsNotEmpty, IsInt, Min, Max} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trip } from '../entities/trip.entity';

export class RateDto {
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    @ApiProperty({
        example: 1,
        description: 'Mark, that user would set to the trip'
    })
    mark: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Good job!',
        description: 'Short comment for the trip'
    })
    comment: string;

    @IsNotEmpty()
    @ApiProperty({
        required: false,
        description: "User object"
    })
    trip : Trip;
}