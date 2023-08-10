// Import necessary modules and classes from NestJS and Mongoose
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    // Inject the Book model from Mongoose into the service
    @InjectModel(Book.name)
    private readonly bookModel: mongoose.Model<Book>,
  ) {}

  // Function to retrieve all books from the database
  async findAll(): Promise<Book[]> {
    // Use the bookModel to find all documents in the collection and execute the query
    return await this.bookModel.find().exec();
  }

  // Function to create a new book document in the database
  async create(book: Book): Promise<Book> {
    // Use the bookModel to create a new document based on the provided book data
    const result = await this.bookModel.create(book);
    return result;
  }

  // Function to find a book by its ID in the database
  async findById(id: string): Promise<Book> {
    // Use the bookModel to find a document by its ID
    const book = await this.bookModel.findById(id);
    console.log(book);

    // If no book is found with the provided ID, throw a NotFoundException
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  // Function to update a book document by its ID
  async updateById(id: string, book: Book): Promise<Book> {
    // Use the bookModel to find and update a document by its ID with the provided book data
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validators on update
    });
  }

  // Function to delete a book document by its ID
  async deleteById(id: string): Promise<Book> {
    // Use the bookModel to find and delete a document by its ID
    return await this.bookModel.findByIdAndDelete(id);
  }
}
