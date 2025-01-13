import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';

@ApiTags('Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: User,
  })
  async find(@Request() req) {
    return this.usersService.findOne(req.user.userId);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({
    status: 200,
    description: 'User balance',
    type: Number,
  })
  async getBalance(@Request() req) {
    const user = await this.usersService.findOne(req.user.userId);
    return user.balance;
  }

  @Get('credit')
  @ApiOperation({ summary: 'Get user credit' })
  @ApiResponse({
    status: 200,
    description: 'User credit',
    type: Number,
  })
  async getCredit(@Request() req) {
    const user = await this.usersService.findOne(req.user.userId);
    return user.credit;
  }
}
