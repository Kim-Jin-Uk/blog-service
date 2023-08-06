import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comments } from './Comments';
import { Hits } from './Hits';
import { Likes } from './Likes';
import { Members } from './Members';
import { PostsHashtags } from './PostsHashtags';

@Index('posts_pk_idex_id', ['id'], { unique: true })
@Index('memberId', ['memberId'], {})
@Index('posts_ft_index_title', ['title'], { fulltext: true })
@Index('posts_ft_index_contents', ['contents'], { fulltext: true })
@Entity('posts', { schema: 'posting_app_project' })
export class Posts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'memberId', length: 20 })
  memberId: string;

  @Column('varchar', { name: 'title', length: 40 })
  title: string;

  @Column('text', { name: 'contents' })
  contents: string;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];

  @OneToMany(() => Hits, (hits) => hits.post)
  hits: Hits[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likes: Likes[];

  @ManyToOne(() => Members, (members) => members.posts, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'memberId', referencedColumnName: 'id' }])
  member: Members;

  @OneToMany(() => PostsHashtags, (postsHashtags) => postsHashtags.post)
  postsHashtags: PostsHashtags[];
}
