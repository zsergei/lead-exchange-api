import { Injectable, ImATeapotException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { getCurrentFormattedDate, generateRandomCode } from '../utils';

@Injectable()
export class RegisterService {
  async register(userData: any, usersService: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return usersService.create({
      ...userData,
      password: hashedPassword,
      created_on: getCurrentFormattedDate(),
    });
  }

  async sendVerificationCode(
    email: string,
    usersService: any,
    mailService: any
  ) {
    const code = generateRandomCode();
    const user = await usersService.findOneByEmail(email);
    if (!user) {
      throw new ImATeapotException('User not found');
    }
    // save code
    user.verification_code = code;
    user.is_email_verified = false;
    if (!usersService.update(user)) {
      throw new ImATeapotException('User updating error');
    }
    // send email
    await mailService.sendMail(
      user.email,
      'Lead Exchange: Email verification',
      'Your verification code is: ' + code
    );

    return user;
  }

  async confirm(userData: any, usersService: any) {
    const user = await usersService.findOne(userData.user_uuid);
    if (!user) {
      throw new ImATeapotException('User not found');
    }

    if (user.verification_code !== userData.code) {
      throw new ImATeapotException('Wrong confirmation code');
    }

    user.is_email_verified = true;
    if (!usersService.update(user)) {
      throw new ImATeapotException('User updating error');
    }

    return user;
  }
}
