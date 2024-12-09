import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    type: 'varchar',
    length: '255',
  })
  title: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @Column({
    type: 'date',
  })
  today: Date;

  @Column({
    type: 'tinyint',
    width: 1,
  })
  status: number;

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

  @ManyToOne(() => UserEntity, (user) => user.post, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comment: CommentEntity[];
}
