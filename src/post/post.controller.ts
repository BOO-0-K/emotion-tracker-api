import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
  PostDeleteResponseDto,
  PostDetailDto,
  PostDetailResponseDto,
  PostIdDto,
  PostListDto,
  PostListResponseDto,
  PostUpdateResponseDto,
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
   * @param id string
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

  /**
   * 포스트 수정
   * @param user UserEntity
   * @param id string
   * @param postRequestDto PostRequestDto
   * @returns PostUpdateResponseDto
   */
  @Patch(':id')
  @UseGuards(AuthGuard())
  async updatePost(
    @Token() user: UserEntity,
    @Param('id') id: string,
    @Body(ValidationPipe) postRequestDto: PostRequestDto,
  ): Promise<PostUpdateResponseDto> {
    await this.postService.updatePost(+user.id, +id, postRequestDto);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['UPDATE_POST_SUCCESS'],
    };
  }

  /**
   * 포스트 삭제
   * @param user UserEntity
   * @param id string
   * @returns PostDeleteResponseDto
   */
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deletePost(
    @Token() user: UserEntity,
    @Param('id') id: string,
  ): Promise<PostDeleteResponseDto> {
    await this.postService.deletePost(+user.id, +id);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['DELETE_POST_SUCCESS'],
    };
  }
}
