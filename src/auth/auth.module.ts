import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), //DEFAULT EXTRACT JWT FROM HEADER
    JwtModule.registerAsync({
      //REGISTER JWT MODULE
      inject: [ConfigService], //INJECT CONFIG SERVICE
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'), //GET JWT SECRET FROM CONFIG SERVICE
          signOptions: {
            expiresIn: configService.get<string | number>('JWT_EXPIRES'), //GET JWT EXPIRES FROM CONFIG SERVICE
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
