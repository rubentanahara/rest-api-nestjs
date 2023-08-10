// Import necessary modules and classes from NestJS
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';

@Module({
  // Import the Mongoose module and associate the 'Book' schema with the 'Book' model
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  // Specify the controller(s) to be associated with this module
  controllers: [BookController],
  // Specify the service(s) to be associated with this module
  providers: [BookService],
})
export class BookModule {}
