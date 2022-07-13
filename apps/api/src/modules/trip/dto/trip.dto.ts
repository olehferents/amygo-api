import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '../../driver/entities/driver.entity';
import { User } from '../../user/entities/user.entity';

export class TripDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Zelena, 108",
        description: "Place, where the user will be picked up"
    })
    readonly from: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Zelena, 108",
        description: "Place, which the user set as endpoint"
    })
    readonly where: string;

    @ApiProperty({
        required: false,
        description: 'Driver object'
    })
    driver: Driver;

    @ApiProperty({
        required: false,
        description: 'User object'
    })
    user: User;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: "2",
        description: "Amount of passengers"
    })
    readonly numberPeople: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: "23",
        description: "Price of the trip"
    })
    readonly price: number;

    @ApiProperty({
        required: false,
        example: "26-07-2021",
        description: "Date, when the trip turned out"
    })
    date: Date;
}