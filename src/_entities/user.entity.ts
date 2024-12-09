import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';

@Entity('users')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PostEntity, (post) => post.user)
  post: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comment: CommentEntity[];
}
