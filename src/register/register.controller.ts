import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterService } from './register.service';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { ConfirmEmailDto } from '../register/dto/register.dto';
import {
  UserRegister,
  UserVerifyEmail,
} from '../users/entities/user-verify-email.entity';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Client')
@Controller('register')
export class RegisterController {
  constructor(
    private readonly usersService: UsersService,
    private readonly registerService: RegisterService,
    private readonly mailService: MailService
  ) {}

  @Post('')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserRegister,
  })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.registerService.register(
      createUserDto,
      this.usersService
    );

    await this.registerService.sendVerificationCode(
      user.email,
      this.usersService,
      this.mailService
    );

    return { id: user.id, email: user.email, created_on: user.created_on };
  }

  @Post('verify')
  @ApiOperation({ summary: 'Email verification code confirmation' })
  @ApiBody({ type: ConfirmEmailDto })
  @ApiResponse({
    status: 201,
    description: 'Email verified',
    type: UserVerifyEmail,
  })
  async verify(@Body() confirmEmailDto: ConfirmEmailDto) {
    const user = await this.registerService.confirm(
      confirmEmailDto,
      this.usersService
    );

    return {
      id: user.id,
      email: user.email,
      last_changed_on: user.last_changed_on,
    };
  }
}
