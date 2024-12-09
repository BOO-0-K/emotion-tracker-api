import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/_commons/auth/jwt.strategy';
import { UserService } from './user.service';
import { UserRepository } from 'src/_repositories/user.repository';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_SECRET_EXPIRES_IN },
    }),
  ],
  controllers: [UserController],
  providers: [JwtStrategy, UserService, UserRepository],
})
export class UserModule {}
