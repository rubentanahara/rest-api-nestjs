import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import * as mongoose from 'mongoose';

export enum Category {
  ADVENTURE = 'Adventure',
  DRAMA = 'Drama',
  FANTASY = 'Fantasy',
  HORROR = 'Horror',
  MYSTERY = 'Mystery',
  ROMANCE = 'Romance',
  THRILLER = 'Thriller',
  WESTERN = 'Western',
  DYSTOPIA = 'Dystopia',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
