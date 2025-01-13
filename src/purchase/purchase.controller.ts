import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BtcpayService } from '../btcpay/btcpay.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  CreatePurchaseDto,
  CreatePurchaseResultDto,
} from './dto/create-purchase.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { UsersService } from '../users/users.service';
import { RequestsService } from '../requests/requests.service';

@ApiBearerAuth()
@ApiTags('Client')
@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly btcpayService: BtcpayService,
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
    private readonly requestService: RequestsService
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Do purchase' })
  @ApiBody({ type: CreatePurchaseDto })
  @ApiResponse({
    status: 200,
    description: 'Purchase created',
    type: CreatePurchaseResultDto,
  })
  async createPayment(@Body() paymentData: CreatePurchaseDto, @Request() req) {
    const {
      payment_gateway,
      amount,
      filter_list_uuid,
      country,
      state,
      npa,
      is_dno,
      is_dnc,
      is_litigation,
    } = paymentData;

    if (!amount) {
      throw new HttpException('Amount is required', 400);
    }

    // get user
    const user = await this.usersService.findOne(req.user.userId);

    switch (payment_gateway) {
      case 'btcpay':
        try {
          const invoice = await this.btcpayService.createInvoice(
            amount,
            'USD',
            req.user.userId
          );
          // save transaction
          await this.transactionsService.create(
            null,
            amount,
            invoice.id,
            user.balance,
            0,
            req.user.userId,
            req.user.userId,
            false
          );
          return {
            success: true,
            paymentUrl: invoice.checkoutLink, // URL for the payment link
            // invoiceData: invoice,
          };
        } catch (error) {
          throw new HttpException(error.message, error.status || 500);
        }
        break;
      case 'balance':
        if (user.balance < amount)
          throw new HttpException('Insufficient balance', 402);

        const request = await this.requestService.create(
          paymentData,
          req.user.userId
        );
        if (request?.order_uuid) {
          const balanceBefore = user.balance;
          user.balance -= amount;
          await this.usersService.update(user);
          // save transaction
          await this.transactionsService.create(
            null,
            amount,
            null,
            balanceBefore,
            user.balance,
            req.user.userId,
            req.user.userId,
            false,
            request.order_uuid
          );
        }
        return request;
        break;
    }
  }
}
