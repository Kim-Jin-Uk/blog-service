import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Members } from './Members';
import { Posts } from './Posts';
import { Replies } from './Replies';

@Index('comments_pk_idex_id', ['id'], { unique: true })
@Index('memberId', ['memberId'], {})
@Index('postId', ['postId'], {})
@Entity('comments', { schema: 'posting_app_project' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'postId' })
  postId: number;

  @Column('varchar', { name: 'memberId', length: 20 })
  memberId: string;

  @Column('varchar', { name: 'contents', length: 500 })
  contents: string;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Members, (members) => members.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'memberId', referencedColumnName: 'id' }])
  member: Members;

  @ManyToOne(() => Posts, (posts) => posts.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: Posts;

  @OneToMany(() => Replies, (replies) => replies.comment)
  replies: Replies[];
}
