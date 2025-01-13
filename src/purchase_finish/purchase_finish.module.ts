import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseFinishController } from './purchase_finish.controller';
import { VerifySignatureMiddleware } from './verify-signature.middleware';
import { LoggerService } from '../logger.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { Transaction } from '../transactions/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    UsersModule,
    TransactionsModule,
  ],
  controllers: [PurchaseFinishController],
  providers: [LoggerService, UsersService, User, TransactionsService],
})
export class PurchaseFinishModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifySignatureMiddleware)
      .forRoutes({ path: 'purchase-finish', method: RequestMethod.POST });
  }
}
