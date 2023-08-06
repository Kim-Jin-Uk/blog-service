import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostsHashtags } from './PostsHashtags';

@Index('hashtags_pk_idex_id', ['id'], { unique: true })
@Index('hashtags_uk_idex_name', ['name'], { unique: true })
@Index('hashtags_ft_index_name', ['name'], { fulltext: true })
@Entity('hashtags', { schema: 'posting_app_project' })
export class Hashtags {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 20 })
  name: string;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => PostsHashtags, (postsHashtags) => postsHashtags.hashtag)
  postsHashtags: PostsHashtags[];
}
