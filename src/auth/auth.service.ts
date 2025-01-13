import { ImATeapotException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { getCurrentFormattedDate, generatePassword } from '../utils';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(
    email: string,
    password: string,
    usersService: any,
    is_admin = false
  ): Promise<any> {
    const user = await usersService.findOneByEmail(email);
    if (
      user &&
      user.is_email_verified === true &&
      user.is_admin === is_admin &&
      (await bcrypt.compare(password, user.password))
    ) {
      // set timestamp
      user.last_login_on = getCurrentFormattedDate();
      await usersService.update(user);
      //
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, usersService) {
    const userDb = await usersService.findOne(user.id);
    const payload = {
      username: user.email,
      sub: user.id,
      is_admin: userDb.is_admin,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: `${process.env.JWT_SECRET}`,
      }),
      is_admin: userDb.is_admin,
    };
  }

  async check(email: string, usersService: any) {
    return await usersService.findOneByEmail(email);
  }

  async reset(user: any, usersService: any, mailService: any) {
    const newPassword = generatePassword();
    // update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    if (!usersService.update(user)) {
      throw new ImATeapotException('User updating error');
    }
    // send email
    await mailService.sendMail(
      user.email,
      'Lead Exchange: Password reset',
      'Your new password is: ' + newPassword
    );

    return user;
  }
}
