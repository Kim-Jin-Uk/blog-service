import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Members } from './Members';
import { Posts } from './Posts';

@Index('hits_pk_idex_id', ['id'], { unique: true })
@Index('hits_uk_idex_memberId_postId', ['memberId', 'postId'], { unique: true })
@Index('postId', ['postId'], {})
@Entity('hits', { schema: 'posting_app_project' })
export class Hits {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'memberId', length: 20 })
  memberId: string;

  @Column('int', { name: 'postId' })
  postId: number;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Members, (members) => members.hits, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'memberId', referencedColumnName: 'id' }])
  member: Members;

  @ManyToOne(() => Posts, (posts) => posts.hits, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: Posts;
}
