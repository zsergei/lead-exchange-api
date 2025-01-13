import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RegisterModule } from './register/register.module';
import { MailModule } from './mail/mail.module';
import { FilterListsModule } from './filter_lists/filter_lists.module';
import { User } from './users/user.entity';
import { FilterList } from './filter_lists/filter_list.entity';
import { PhoneNumbersModule } from './phone_numbers/phone_numbers.module';
import { FilterListPhoneNumber } from './filter_list_phone_number/filter_list_phone_number.entity';
import { FilterListPhoneNumberModule } from './filter_list_phone_number/filter_list_phone_number.module';
import { ClickHouseService } from './clickhouse/clickhouse.service';
import { ClickHouseModule } from './clickhouse/clickhouse.module';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/payment.entity';
import { RequestsModule } from './requests/requests.module';
import { Request } from './requests/request.entity';
import { RequestPhoneNumberModule } from './request_phone_number/request_phone_number.module';
import { RequestPhoneNumber } from './request_phone_number/request_phone_number.entity';
import { BtcpayService } from './btcpay/btcpay.service';
import { PurchaseController } from './purchase/purchase.controller';
import { PurchaseFinishController } from './purchase_finish/purchase_finish.controller';
import { LoggerService } from './logger.service';
import { PurchaseFinishModule } from './purchase_finish/purchase_finish.module';
import { AdminModule } from './admin/admin.module';
import { UploadController } from './upload/upload.controller';
import { Upload } from './upload/upload.entity';
import { UploadModule } from './upload/upload.module';
import { SearchModule } from './search/search.module';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        FilterList,
        FilterListPhoneNumber,
        Payment,
        Request,
        RequestPhoneNumber,
        Upload,
        Transaction,
      ],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    UsersModule,
    RegisterModule,
    MailModule,
    FilterListsModule,
    PhoneNumbersModule,
    FilterListPhoneNumberModule,
    ClickHouseModule,
    PaymentsModule,
    RequestsModule,
    RequestPhoneNumberModule,
    PurchaseFinishModule,
    AdminModule,
    UploadModule,
    SearchModule,
    TransactionsModule,
  ],
  providers: [ClickHouseService, BtcpayService, LoggerService],
  controllers: [PurchaseController, PurchaseFinishController, UploadController],
  exports: [LoggerService],
})
export class AppModule {}
