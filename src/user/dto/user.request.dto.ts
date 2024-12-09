import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

//회원가입 Request
export class SignupRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  username: string; //사용자 이름

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9\u3131-\u3163\uac00-\ud7a3]*$/, {
    message: 'password only accepts english, korean and number',
  })
  password: string; //비밀번호
}

//로그인 Request
export class SigninRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  username: string; //사용자 이름

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9\u3131-\u3163\uac00-\ud7a3]*$/, {
    message: 'password only accepts english, korean and number',
  })
  password: string; //비밀번호
}

export class MeRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9\u3131-\u3163\uac00-\ud7a3]*$/, {
    message: 'password only accepts english, korean and number',
  })
  password: string; //비밀번호

  @IsBoolean()
  isActive: boolean; //활성화 여부
}
