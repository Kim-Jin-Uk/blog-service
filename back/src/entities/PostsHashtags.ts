import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './Posts';
import { Hashtags } from './Hashtags';

@Index('posts_hashtags_pk_idex_id', ['id'], { unique: true })
@Index('postId', ['postId'], {})
@Index('hashtagId', ['hashtagId'], {})
@Entity('posts_hashtags', { schema: 'posting_app_project' })
export class PostsHashtags {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'postId' })
  postId: number;

  @Column('int', { name: 'hashtagId' })
  hashtagId: number;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Posts, (posts) => posts.postsHashtags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: Posts;

  @ManyToOne(() => Hashtags, (hashtags) => hashtags.postsHashtags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'hashtagId', referencedColumnName: 'id' }])
  hashtag: Hashtags;
}
