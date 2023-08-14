import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return await this.authService.signUp(signUpDto);
  }
}
