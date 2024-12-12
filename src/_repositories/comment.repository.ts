import { DataSource, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentEntity } from 'src/_entities/comment.entity';
import { CommentRequestDto } from 'src/comment/dto/comment.request.dto';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';
import { CommentDto } from 'src/comment/dto/comment.response.dto';

@Injectable()
export class CommentRepository extends Repository<CommentEntity> {
  constructor(private dataSource: DataSource) {
    super(CommentEntity, dataSource.createEntityManager());
  }

  //댓글 추가
  async createComment(commentRequestDto: CommentRequestDto): Promise<number> {
    try {
      const comment = await this.insert(commentRequestDto);
      return comment.identifiers[0].id;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //모든 댓글 리스트 조회
  async findAllComments(postId: number): Promise<Array<CommentDto>> {
    try {
      const comments = await this.find({
        where: { postId, isDeleted: false },
        relations: ['user'],
        order: {
          createdAt: 'ASC',
        },
      });

      const result: Array<CommentDto> = await comments.map((comment) => {
        return {
          id: comment.id,
          postId: comment.postId,
          userId: comment.userId,
          content: comment.content,
          username: comment.user.username,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        };
      });

      return result;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //댓글 접근 권한 체크
  async checkCommentAccess(userId: number, id: number): Promise<CommentEntity> {
    try {
      const comment: CommentEntity = await this.findOne({
        where: {
          userId,
          id,
        },
      });
      return comment;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //댓글 수정
  async updateComment(id: number, commentRequestDto: CommentRequestDto): Promise<void> {
    try {
      await this.update(id, commentRequestDto);
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //댓글 삭제
  async deleteComment(id: number): Promise<void> {
    try {
      // await this.delete(id);
      await this.update(id, {
        isDeleted: true,
      });
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
