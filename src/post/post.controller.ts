import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/_commons/auth/token.decorator';
import { PostRequestDto, TodayRequestDto } from './dto/post.request.dto';
import {
  PostAddResponseDto,
  PostDetailDto,
  PostDetailResponseDto,
  PostIdDto,
  PostListDto,
  PostListResponseDto,
} from './dto/post.response.dto';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';
import { UserEntity } from 'src/_entities/user.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * 포스트 추가
   * @param user UserEntity
   * @param postRequestDto PostRequestDto
   * @returns PostAddResponseDto
   */
  @Post()
  @UseGuards(AuthGuard())
  async addPost(
    @Token() user: UserEntity,
    @Body(ValidationPipe) postRequestDto: PostRequestDto,
  ): Promise<PostAddResponseDto> {
    const postId: PostIdDto = await this.postService.addPost(+user.id, postRequestDto);

    return {
      statusCode: 201,
      message: CustomHttpSuccess['ADD_POST_SUCCESS'],
      data: postId,
    };
  }

  /**
   * 포스트 리스트
   * @param todayRequestDto TodayRequestDto
   * @returns PostListResponseDto
   */
  @Get()
  @UseGuards(AuthGuard())
  async getPosts(
    @Query(ValidationPipe) todayRequestDto: TodayRequestDto,
  ): Promise<PostListResponseDto> {
    const posts: PostListDto = await this.postService.getPosts(todayRequestDto);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_POSTS_SUCCESS'],
      data: posts,
    };
  }

  /**
   * 포스트 상세
   * @param id number
   * @returns PostDetailResponseDto
   */
  @Get(':id')
  @UseGuards(AuthGuard())
  async getPost(@Param('id') id: string): Promise<PostDetailResponseDto> {
    const post: PostDetailDto = await this.postService.getPost(+id);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_POST_SUCCESS'],
      data: post,
    };
  }
}
