import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MeRequestDto, SigninRequestDto, SignupRequestDto } from './dto/user.request.dto';
import {
  AccessTokenDto,
  MeResponseDto,
  MeUpdateResponseDto,
  SigninResponseDto,
  SignupResponseDto,
} from './dto/user.response.dto';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/_commons/auth/token.decorator';
import { UserEntity } from 'src/_entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 회원가입
   * @param signupRequestDto SignupRequestDto
   * @returns SignupResponseDto
   */
  @Post('/signup')
  async signup(
    @Body(ValidationPipe) signupRequestDto: SignupRequestDto,
  ): Promise<SignupResponseDto> {
    const accessToken: AccessTokenDto = await this.userService.signup(signupRequestDto);

    return {
      statusCode: 201,
      message: CustomHttpSuccess['SIGNUP_SUCCESS'],
      data: accessToken,
    };
  }

  /**
   * 로그인
   * @param signinRequestDto SigninRequestDto
   * @returns SigninResponseDto
   */
  @HttpCode(200)
  @Post('/signin')
  async signin(
    @Body(ValidationPipe) signinRequestDto: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    const accessToken: AccessTokenDto = await this.userService.signin(signinRequestDto);

    return {
      statusCode: 200,
      message: CustomHttpSuccess['SIGNIN_SUCCESS'],
      data: accessToken,
    };
  }

  /**
   * 내 정보 보기
   * @param user UserEntity
   * @returns MeResponseDto
   */
  @Get('/me')
  @UseGuards(AuthGuard())
  async getMyInfo(@Token() user: UserEntity): Promise<MeResponseDto> {
    const myInfo = await this.userService.getMyInfo(user);

    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_MY_INFO_SUCCESS'],
      data: myInfo,
    };
  }

  /**
   * 내 정보 수정
   * @param user UserEntity
   * @param meRequestDto MeRequestDto
   * @returns MeUpdateResponseDto
   */
  @Patch('/me')
  @UseGuards(AuthGuard())
  async updateMyInfo(
    @Token() user: UserEntity,
    @Body(ValidationPipe) meRequestDto: MeRequestDto,
  ): Promise<MeUpdateResponseDto> {
    await this.userService.updateMyInfo(+user.id, meRequestDto);

    return {
      statusCode: 200,
      message: CustomHttpSuccess['UPDATE_MY_INFO_SUCCESS'],
    };
  }
}
