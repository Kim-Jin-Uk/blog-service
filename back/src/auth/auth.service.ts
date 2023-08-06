import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Members } from '@/entities/Members';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Members) private membersRepository: Repository<Members>,
  ) {}

  async validateUser(id: string, password: string) {
    const member = await this.membersRepository.findOne({
      where: { id },
      select: ['id', 'password'],
    });
    if (!member) {
      return null;
    }
    const result = await bcrypt.compare(password, member.password);
    if (result) {
      const { password, ...userWithoutPassword } = member;
      return userWithoutPassword;
    }
    return null;
  }
}
