import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class AddToCartDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  itemId: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;
}
