import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from 'src/_repositories/user.repository';
import { MeRequestDto, SignupRequestDto } from './dto/user.request.dto';
import { AccessTokenDto, MeDto } from './dto/user.response.dto';
import { UserEntity } from 'src/_entities/user.entity';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * 회원가입
   * @param signupRequestDto SignupRequestDto
   * @returns AccessTokenDto
   */
  async signup(signupRequestDto: SignupRequestDto): Promise<AccessTokenDto> {
    const { username, password } = signupRequestDto;

    //사용자명으로 회원 찾기
    const user: UserEntity = await this.userRepository.findByUsername(username);
    if (user) {
      throw new HttpException(CustomHttpException['CONFLICT_USERNAME'], HttpStatus.CONFLICT); //사용자명 중복
    }

    //회원 생성
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt); //DB 패스워드 암호화
    await this.userRepository.createUser(username, hashedPassword);

    //JWT 토큰 생성
    const payload = { username };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }

  /**
   * 로그인
   * @param signinRequestDto SigninRequestDto
   * @returns AccessTokenDto
   */
  async signin(signinRequestDto: SignupRequestDto): Promise<AccessTokenDto> {
    const { username, password } = signinRequestDto;

    //사용자명으로 회원 찾기
    const user: UserEntity = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new HttpException(CustomHttpException['UNAUTHORIZED_ACCOUNT'], HttpStatus.UNAUTHORIZED); //사용자명이 없는 경우
    }

    if (!(await bcrypt.compare(password, user['password']))) {
      throw new HttpException(CustomHttpException['UNAUTHORIZED_ACCOUNT'], HttpStatus.UNAUTHORIZED); //비밀번호가 다른 경우
    }

    //JWT 토큰 생성
    const payload = { username };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }

  /**
   * 내 정보 보기
   * @param user UserEntity
   * @returns MeDto
   */
  async getMyInfo(user: UserEntity): Promise<MeDto> {
    const id: number = user.id;
    const username: string = user.username;
    const isActive: boolean = user.isActive;

    return { id, username, isActive };
  }

  /**
   * 내 정보 수정
   * @param id number
   * @param meRequestDto MeRequestDto
   * @returns
   */
  async updateMyInfo(id: number, meRequestDto: MeRequestDto): Promise<void> {
    const password = meRequestDto['password'];

    //DB 패스워드 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    meRequestDto['password'] = hashedPassword;

    await this.userRepository.updateUser(id, meRequestDto);
  }
}
