import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { RegisterModule } from '../register/register.module';
import { HttpBasicStrategy } from './basic.strategy';
import { AuthService } from '../auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    UsersModule,
    RegisterModule,
    PassportModule,
    JwtModule.register({
      secret: '1234567890', // process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
    TransactionsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, HttpBasicStrategy, AuthService, JwtService],
})
export class AdminModule {}
