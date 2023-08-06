import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Members } from '@/entities/Members';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(Members) private membersRepository: Repository<Members>,
  ) {
    super();
  }

  serializeUser(member: Members, done: CallableFunction) {
    done(null, member.id);
  }

  async deserializeUser(memberId: string, done: CallableFunction) {
    return await this.membersRepository
      .findOneOrFail({
        where: { id: memberId },
        select: ['id', 'nickname'],
      })
      .then((member) => {
        done(null, member);
      })
      .catch((error) => done(error));
  }
}
