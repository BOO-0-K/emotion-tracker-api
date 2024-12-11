import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from 'src/_repositories/post.repository';
import { PostRequestDto, TodayRequestDto } from './dto/post.request.dto';
import { PostDetailDto, PostDto, PostIdDto, PostListDto } from './dto/post.response.dto';
import { PostEntity } from 'src/_entities/post.entity';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  /**
   * 포스트 추가
   * @param userId number
   * @param postRequestDto PostRequestDto
   * @returns PostIdDto
   */
  async addPost(userId: number, postRequestDto: PostRequestDto): Promise<PostIdDto> {
    postRequestDto['userId'] = userId;
    const postId: number = await this.postRepository.createPost(postRequestDto);
    return { id: postId };
  }

  /**
   * 포스트 리스트
   * @param todayRequestDto TodayRequestDto
   * @returns PostListDto
   */
  async getPosts(todayRequestDto: TodayRequestDto): Promise<PostListDto> {
    const startDate: string = todayRequestDto.startDate;
    const endDate: string = todayRequestDto.endDate;
    const posts: Array<PostDto> = await this.postRepository.findAllPosts(startDate, endDate);
    return { posts };
  }

  /**
   * 포스트 상세
   * @param id number
   * @returns PostDetailDto
   */
  async getPost(id: number): Promise<PostDetailDto> {
    const post: PostDto = await this.postRepository.findOnePost(id);
    return { post };
  }

  /**
   * 포스트 수정
   * @param userId number
   * @param id number
   * @param postRequestDto PostRequestDto
   * @returns
   */
  async updatePost(userId: number, id: number, postRequestDto: PostRequestDto): Promise<void> {
    //포스트 접근 권한 체크
    const postAccess: PostEntity = await this.postRepository.checkPostAccess(userId, id);
    if (!postAccess) {
      throw new HttpException(CustomHttpException['FORBIDDEN_POST'], HttpStatus.FORBIDDEN);
    }

    await this.postRepository.updatePost(id, postRequestDto);
  }

  /**
   * 포스트 삭제
   * @param userId number
   * @param id number
   */
  async deletePost(userId: number, id: number): Promise<void> {
    //포스트 접근 권한 체크
    const postAccess: PostEntity = await this.postRepository.checkPostAccess(userId, id);
    if (!postAccess) {
      throw new HttpException(CustomHttpException['FORBIDDEN_POST'], HttpStatus.FORBIDDEN);
    }

    await this.postRepository.deletePost(id);
  }
}
