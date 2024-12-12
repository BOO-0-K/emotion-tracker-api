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
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/_commons/auth/token.decorator';
import { UserEntity } from 'src/_entities/user.entity';
import { CommentRequestDto, PostIdRequestDto } from './dto/comment.request.dto';
import {
  CommentAddResponseDto,
  CommentDeleteResponseDto,
  CommentIdDto,
  CommentListDto,
  CommentListResponseDto,
  CommentUpdateResponseDto,
} from './dto/comment.response.dto';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * 댓글 추가
   * @param user UserEntity
   * @param commentRequestDto CommentRequestDto
   * @returns CommentAddResponseDto
   */
  @Post()
  @UseGuards(AuthGuard())
  async addComment(
    @Token() user: UserEntity,
    @Body(ValidationPipe) commentRequestDto: CommentRequestDto,
  ): Promise<CommentAddResponseDto> {
    const commentId: CommentIdDto = await this.commentService.addComment(
      +user.id,
      commentRequestDto,
    );
    return {
      statusCode: 201,
      message: CustomHttpSuccess['ADD_COMMENT_SUCCESS'],
      data: commentId,
    };
  }

  /**
   * 댓글 리스트
   * @param id string
   * @returns CommentListResponseDto
   */
  @Get()
  @UseGuards(AuthGuard())
  async getComments(
    @Query(ValidationPipe) postIdRequestDto: PostIdRequestDto,
  ): Promise<CommentListResponseDto> {
    const comments: CommentListDto = await this.commentService.getComments(postIdRequestDto);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_COMMENTS_SUCCESS'],
      data: comments,
    };
  }

  /**
   * 댓글 수정
   * @param user UserEntity
   * @param id string
   * @param commentRequestDto CommentRequestDto
   * @returns CommentUpdateResponseDto
   */
  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateComment(
    @Token() user: UserEntity,
    @Param('id') id: string,
    @Body(ValidationPipe) commentRequestDto: CommentRequestDto,
  ): Promise<CommentUpdateResponseDto> {
    await this.commentService.updateComment(+user.id, +id, commentRequestDto);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['UPDATE_COMMENT_SUCCESS'],
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteComment(
    @Token() user: UserEntity,
    @Param('id') id: string,
  ): Promise<CommentDeleteResponseDto> {
    await this.commentService.deleteComment(+user.id, +id);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['DELETE_COMMENT_SUCCESS'],
    };
  }
}
