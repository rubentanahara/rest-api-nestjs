// Import necessary modules and classes from NestJS and local files
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book-dto';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  // Route: GET /books
  // Get all books from the database
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  // Route: POST /books
  // Create a new book
  @Post()
  async create(@Body() book: CreateBookDto): Promise<Book> {
    return await this.bookService.create(book);
  }

  // Route: GET /books/:id
  // Get a book by its ID
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  // Route: PUT /books/:id
  // Update a book by its ID
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  // Route: DELETE /books/:id
  // Delete a book by its ID
  @Delete(':id')
  async deleteBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
