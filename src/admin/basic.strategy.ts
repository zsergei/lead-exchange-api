import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';

@Injectable()
export class HttpBasicStrategy extends PassportStrategy(
  BasicStrategy,
  'basic'
) {
  constructor() {
    super();
  }

  validate(username: string, password: string): any {
    if (
      username === process.env.ADMIN_LOGIN &&
      password === process.env.ADMIN_PASSOWRD
    ) {
      return { username }; // or user details
    } else {
      throw new UnauthorizedException();
    }
  }
}
