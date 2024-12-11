import { IsDateString, IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PostRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string; //제목

  @IsDateString()
  @IsNotEmpty()
  today: string; //오늘 날짜

  @IsNotEmpty()
  @IsIn([1, 2, 3, 4, 5], {
    message: 'status 범위는 1~5입니다.',
  })
  status: number; //상태

  @IsString()
  @IsNotEmpty()
  content: string; //내용
}

export class TodayRequestDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: string; //시작 날짜

  @IsDateString()
  @IsNotEmpty()
  endDate: string; //종료 날짜
}
