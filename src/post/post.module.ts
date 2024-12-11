import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from 'src/_repositories/post.repository';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
