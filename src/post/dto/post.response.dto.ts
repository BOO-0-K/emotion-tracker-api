// Post 아이디
export class PostIdDto {
  readonly id: number;
}

//Post 추가 Response
export class PostAddResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//Post
export class PostDto {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly today: string;
  readonly status: number;
  readonly content: string;
  readonly username: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

//Post 상세
export class PostDetailDto {
  readonly post: PostDto;
}

//Post 리스트
export class PostListDto {
  readonly posts: Array<PostDto>;
}

//Post 상세 Response
export class PostDetailResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//Post 리스트 Response
export class PostListResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//Post 수정 Response
export class PostUpdateResponseDto {
  readonly statusCode: number;
  readonly message: string;
}

//Post 삭제 Response
export class PostDeleteResponseDto {
  readonly statusCode: number;
  readonly message: string;
}
