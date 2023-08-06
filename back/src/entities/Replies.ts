import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Members } from './Members';
import { Comments } from './Comments';

@Index('replies_pk_idex_id', ['id'], { unique: true })
@Index('memberId', ['memberId'], {})
@Index('commentId', ['commentId'], {})
@Entity('replies', { schema: 'posting_app_project' })
export class Replies {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'commentId' })
  commentId: number;

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

  @ManyToOne(() => Members, (members) => members.replies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'memberId', referencedColumnName: 'id' }])
  member: Members;

  @ManyToOne(() => Comments, (comments) => comments.replies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'commentId', referencedColumnName: 'id' }])
  comment: Comments;
}
