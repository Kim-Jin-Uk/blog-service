import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'id', passwordField: 'password' });
  }

  async validate(memberId: string, password: string, done: CallableFunction) {
    console.log('LocalStrategy', memberId, password);
    const member = await this.authService.validateUser(memberId, password);
    if (!member) throw new UnauthorizedException();
    return done(null, member);
  }
}
