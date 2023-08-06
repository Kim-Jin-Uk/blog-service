import { Members } from '@/entities/Members';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Members) private memberRepository: Repository<Members>,
  ) {}

  async createMember(member: Members): Promise<Members> {
    const hashedPassword = await bcrypt.hash(member.password, 12);
    return await this.memberRepository.save({
      ...member,
      password: hashedPassword,
    });
  }

  async getMember(id: string): Promise<Members> {
    return await this.memberRepository.findOne({ where: { id } });
  }

  async updateMember(id: string, nickname: string): Promise<Members> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) throw new NotFoundException('Member not found');

    member.nickname = nickname;

    return await this.memberRepository.save(member);
  }

  async deleteMember(id: string): Promise<Members> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) throw new NotFoundException('Member not found');
    return await this.memberRepository.remove(member);
  }

  async validateMember(id: string, password: string): Promise<Members | null> {
    const member = await this.getMember(id);
    if (!member) return null;
    if (member && !compare(password, member.password)) return null;
    return member;
  }
}
