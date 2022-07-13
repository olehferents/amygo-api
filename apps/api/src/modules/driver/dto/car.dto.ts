import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '../entities/driver.entity';

export class CarDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Ford',
        description: 'Brand of the car'
    })
    readonly brand: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Focus',
        description: 'Model of the car'
    })
    readonly model: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Blue',
        description: 'Color of the car'
    })
    readonly color: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'AA0000AA',
        description: 'Car number'
    })
    readonly carNumber: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Classic',
        description: 'Type of the car'
    })
    readonly carType: string;

    @ApiProperty({
        required: false,
        description: 'Driver object'
    })
    driver: Driver;
}