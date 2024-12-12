import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/_repositories/comment.repository';
import { CommentRequestDto, PostIdRequestDto } from './dto/comment.request.dto';
import { CommentDto, CommentIdDto, CommentListDto } from './dto/comment.response.dto';
import { CommentEntity } from 'src/_entities/comment.entity';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  /**
   * 댓글 추가
   * @param userId number
   * @param commentRequestDto CommentRequestDto
   * @returns CommentIdDto
   */
  async addComment(userId: number, commentRequestDto: CommentRequestDto): Promise<CommentIdDto> {
    commentRequestDto['userId'] = userId;
    const commentId: number = await this.commentRepository.createComment(commentRequestDto);
    return { id: commentId };
  }

  /**
   * 댓글 리스트
   * @param postIdRequestDto PostIdRequestDto
   * @returns CommentListDto
   */
  async getComments(postIdRequestDto: PostIdRequestDto): Promise<CommentListDto> {
    const postId = postIdRequestDto.postId;
    const comments: Array<CommentDto> = await this.commentRepository.findAllComments(postId);
    return { comments };
  }

  /**
   * 댓글 수정
   * @param userId number
   * @param id number
   * @param commentRequestDto CommentRequestDto
   */
  async updateComment(
    userId: number,
    id: number,
    commentRequestDto: CommentRequestDto,
  ): Promise<void> {
    //댓글 접근 권한 체크
    const commentAccess: CommentEntity = await this.commentRepository.checkCommentAccess(
      userId,
      id,
    );
    if (!commentAccess) {
      throw new HttpException(CustomHttpException['FORBIDDEN_COMMENT'], HttpStatus.FORBIDDEN);
    }

    await this.commentRepository.updateComment(id, commentRequestDto);
  }

  /**
   * 댓글 삭제
   * @param userId number
   * @param id number
   * @returns
   */
  async deleteComment(userId: number, id: number): Promise<void> {
    //댓글 접근 권한 체크
    const commentAccess: CommentEntity = await this.commentRepository.checkCommentAccess(
      userId,
      id,
    );
    if (!commentAccess) {
      throw new HttpException(CustomHttpException['FORBIDDEN_COMMENT'], HttpStatus.FORBIDDEN);
    }

    await this.commentRepository.deleteComment(id);
  }
}
