import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { name, email, password } = signUpDto;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({ id: user._id });
      console.log('token', token);
      return { token };
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.email === 1
      ) {
        // Duplicate email error
        throw new ConflictException('Email is already in use');
      }
      throw new InternalServerErrorException('Error creating user'); // For other errors
    }
  }
  async login(logindto: LoginDto): Promise<{ token: string }> {
    const { email, password } = logindto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new ConflictException('Email is not registered');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ConflictException('Password is not correct');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
