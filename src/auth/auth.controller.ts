import { Controller, Request, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  AuthUserDto,
  ForgotDto,
  ResetDto,
  AuthTokenDto,
} from '../users/dto/user.dto';

@ApiTags('Client')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  @Post('')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: AuthUserDto })
  @ApiResponse({
    status: 200,
    description: 'User authorized',
    type: AuthTokenDto,
  })
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
      this.usersService
    );
    if (user) {
      return this.authService.login(user, this.usersService);
    }
    return { error: 'Invalid credentials' };
  }

  @ApiOperation({ summary: 'Send email with reset password link' })
  @ApiBody({ type: ForgotDto })
  @Post('forgot-password')
  @ApiResponse({ status: 200, description: 'Email sent' })
  async forgotPassword(@Body('email') email: string): Promise<string> {
    const resetToken = await this.usersService.generateResetToken(email);
    await this.mailService.sendPasswordResetEmail(email, resetToken);
    return 'Reset password link sent to your email';
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiBody({ type: ResetDto })
  @Post('verify-reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body('newPassword') newPassword: string
  ): Promise<string> {
    const user = await this.usersService.validateResetToken(token);
    await this.usersService.resetPassword(user.id, newPassword);
    return 'Password has been reset successfully';
  }
}
