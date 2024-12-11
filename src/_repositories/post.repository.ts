import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';
import { PostEntity } from 'src/_entities/post.entity';
import { PostRequestDto } from 'src/post/dto/post.request.dto';
import { PostDto } from 'src/post/dto/post.response.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(private dataSource: DataSource) {
    super(PostEntity, dataSource.createEntityManager());
  }

  //포스트 추가
  async createPost(postRequestDto: PostRequestDto): Promise<number> {
    try {
      const post = await this.insert(postRequestDto);
      return post.identifiers[0].id;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //모든 포스트 리스트 조회
  async findAllPosts(today: string): Promise<Array<PostDto>> {
    try {
      const todayDate = new Date(today);
      todayDate.setHours(0, 0, 0, 0);

      const posts = await this.find({
        where: { today: todayDate, isDeleted: false },
        relations: ['user'],
        order: {
          createdAt: 'DESC',
        },
      });

      const result: Array<PostDto> = await posts.map((post) => {
        return {
          id: post.id,
          userId: post.userId,
          title: post.title,
          today: post.today.toString(),
          status: post.status,
          content: post.content,
          username: post.user.username,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
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

  //포스트 상세 조회
  async findOnePost(id: number): Promise<PostDto> {
    try {
      const post: PostEntity = await this.findOne({
        where: { id },
        relations: ['user'],
      });
      return {
        id: post.id,
        userId: post.userId,
        title: post.title,
        today: post.today.toString(),
        status: post.status,
        content: post.content,
        username: post.user.username,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //포스트 접근 권한 체크
  async checkPostAccess(userId: number, id: number): Promise<PostEntity> {
    try {
      const post: PostEntity = await this.findOne({ where: { id, userId } });
      return post;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
