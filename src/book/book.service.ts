import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as moongose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: moongose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }
  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    console.log(book);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
