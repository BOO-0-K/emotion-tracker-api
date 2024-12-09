//Access Token
export class AccessTokenDto {
  readonly accessToken: string;
}

//회원가입 Response
export class SignupResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//로그인 Response
export class SigninResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//내 정보 보기
export class MeDto {
  readonly username: string;
  readonly isActive: boolean;
}

//내 정보 보기 Response
export class MeResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//내 정보 수정 Response
export class MeUpdateResponseDto {
  readonly statusCode: number;
  readonly message: string;
}
