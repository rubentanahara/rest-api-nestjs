import { Injectable } from '@nestjs/common';
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
}
