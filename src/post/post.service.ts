import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/_repositories/post.repository';
import { PostRequestDto, TodayRequestDto } from './dto/post.request.dto';
import { PostDetailDto, PostDto, PostIdDto, PostListDto } from './dto/post.response.dto';

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
    const today: string = todayRequestDto.today;
    const posts: Array<PostDto> = await this.postRepository.findAllPosts(today);
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
}
