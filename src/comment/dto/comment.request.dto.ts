import { IsNotEmpty, IsString } from 'class-validator';

export class CommentRequestDto {
  @IsNotEmpty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class PostIdRequestDto {
  postId: number;
}
