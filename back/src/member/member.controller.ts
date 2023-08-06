import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Res,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Members } from '@/entities/Members';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { Member } from '@/common/decorators/member.decorator';
import { LoggedInGuard } from '@/auth/logged-in.guard';
import { Response } from 'express';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @UseGuards(LoggedInGuard)
  @Get(':id')
  getMember(@Param('id') id: string) {
    return this.memberService.getMember(id);
  }

  @Post()
  createMember(@Body() member: Members) {
    return this.memberService.createMember(member);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Member() member: Members) {
    return member;
  }

  @Patch(':id')
  updateMember(@Param('id') id: string, @Body() nickname: string) {
    return this.memberService.updateMember(id, nickname);
  }

  @Delete(':id')
  deleteMember(@Param('id') id: string) {
    return this.memberService.deleteMember(id);
  }

  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('ok');
  }
}
