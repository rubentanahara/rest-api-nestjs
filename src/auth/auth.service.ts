import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) //INJECT USER MODEL
    private userModel: Model<User>, //USER MODEL
    private jwtService: JwtService, //JWT SERVICE
  ) {}

  async signUp(singnUpDto: SignUpDto): Promise<{ token: string }> {
    //SIGN UP METHOD
    const { name, email, password } = singnUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      //CREATE USER
      name,
      email,
      password: hashedPassword,
    });

    console.log(user);
    const token = this.jwtService.sign({ id: user._id }); // CREATE JWT TOKEN
    return { token };
  }
}
