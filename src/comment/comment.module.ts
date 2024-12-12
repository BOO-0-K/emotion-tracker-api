import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from 'src/_repositories/comment.repository';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
