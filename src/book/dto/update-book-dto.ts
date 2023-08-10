import { IsString, IsNumber, IsEnum, Min } from 'class-validator'; // Import the necessary decorators
import { Category } from '../schemas/book.schema';

export class UpdateBookDto {
  @IsString() // Validate that title is a string
  readonly title: string;

  @IsString() // Validate that description is a string
  readonly description: string;

  @IsString() // Validate that author is a string
  readonly author: string;

  @IsNumber() // Validate that price is a number
  @Min(0) // Validate that price is at least 0
  readonly price: number;

  @IsEnum(Category) // Validate that category is one of the defined enum values
  readonly category: Category;
}
