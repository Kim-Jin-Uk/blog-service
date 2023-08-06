import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from '@/entities/Members';

@Module({
  imports: [TypeOrmModule.forFeature([Members])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
