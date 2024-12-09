import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.comment, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comment, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
