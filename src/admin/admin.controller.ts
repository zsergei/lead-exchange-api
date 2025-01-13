import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateAdminDto,
  AuthAdminDto,
  AuthBalanceDto,
  AuthTokenDto,
  CreditDto,
} from '../users/dto/user.dto';
import { UserId } from '../users/entities/user.entity';
import { User } from '../users/user.entity';
import { RegisterService } from '../register/register.service';
import { UsersService } from '../users/users.service';
import { UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from './basic-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';
import { TransactionsService } from '../transactions/transactions.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly registerService: RegisterService,
    private readonly authService: AuthService,
    private readonly transactionsService: TransactionsService
  ) {}

  @Post('register')
  @ApiBasicAuth('basic-auth')
  @UseGuards(BasicAuthGuard)
  @ApiOperation({
    summary: 'Admin registration - see credentials in .env file',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Admin successfully created',
    type: UserId,
  })
  async register(@Body() createAdminDto: CreateAdminDto) {
    createAdminDto.is_admin = true;
    createAdminDto.is_email_verified = true;
    const user = await this.registerService.register(
      createAdminDto,
      this.usersService
    );
    return { id: user.id, email: user.email, created_on: user.created_on };
  }

  @Post('auth')
  @ApiOperation({ summary: 'Admin login' })
  @ApiBody({ type: AuthAdminDto })
  @ApiResponse({
    status: 200,
    description: 'Admin authorized',
    type: AuthTokenDto,
  })
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
      this.usersService,
      true
    );
    if (user) {
      return this.authService.login(user, this.usersService);
    }
    return { error: 'Invalid credentials' };
  }

  @Post('credit')
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: "Change user's credit",
  })
  @ApiBody({ type: AuthBalanceDto })
  @ApiResponse({
    status: 200,
    description: 'Credit changed',
    type: CreditDto,
  })
  async credit(@Request() req) {
    const user = await this.usersService.findOne(req.body.user_id);

    if (user) {
      if (!user.credit) user.credit = 0;
      const balanceBefore = user.credit;
      user.credit += req.body.amount;
      const { id } = await this.usersService.update(user);
      // save transaction
      await this.transactionsService.create(
        req.body.amount,
        null,
        null,
        balanceBefore,
        user.credit,
        req.user.userId,
        user.id,
        true
      );

      return { id };
    }
    return { error: 'Invalid user id' };
  }

  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Users list',
  })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @Get('users')
  async findAll() {
    return this.usersService.findAll();
  }
}
