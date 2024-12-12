//댓글 아이디
export class CommentIdDto {
  readonly id: number;
}

//댓글 추가 Response
export class CommentAddResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//댓글
export class CommentDto {
  readonly id: number;
  readonly postId: number;
  readonly userId: number;
  readonly content: string;
  readonly username: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class CommentListDto {
  readonly comments: Array<CommentDto>;
}

//댓글 리스트
export class CommentListResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//댓글 수정 Response
export class CommentUpdateResponseDto {
  readonly statusCode: number;
  readonly message: string;
}

//댓글 삭제 Response
export class CommentDeleteResponseDto {
  readonly statusCode: number;
  readonly message: string;
}
