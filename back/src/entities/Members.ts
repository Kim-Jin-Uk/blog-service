import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Comments } from './Comments';
import { Hits } from './Hits';
import { Likes } from './Likes';
import { Posts } from './Posts';
import { Replies } from './Replies';

@Index('nickname', ['nickname'], { unique: true })
@Index('mebers_uq_idex_nickname', ['nickname'], { unique: true })
@Index('mebers_pk_idex_id', ['id'], { unique: true })
@Index('mebers_uk_idex_nickname', ['nickname'], { unique: true })
@Index('members_ft_index', ['nickname'], { fulltext: true })
@Index('members_ft_index_nickname', ['nickname'], { fulltext: true })
@Entity('members', { schema: 'posting_app_project' })
export class Members {
  @Column('varchar', { primary: true, name: 'id', length: 20 })
  id: string;

  @Column('varchar', { name: 'password', length: 60 })
  password: string;

  @Column('varchar', { name: 'nickname', unique: true, length: 20 })
  nickname: string;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Comments, (comments) => comments.member)
  comments: Comments[];

  @OneToMany(() => Hits, (hits) => hits.member)
  hits: Hits[];

  @OneToMany(() => Likes, (likes) => likes.member)
  likes: Likes[];

  @OneToMany(() => Posts, (posts) => posts.member)
  posts: Posts[];

  @OneToMany(() => Replies, (replies) => replies.member)
  replies: Replies[];
}
