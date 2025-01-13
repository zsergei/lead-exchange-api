import {
  Controller,
  Post,
  Request,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FinishPurchaseDto,
  FinishPurchaseResultDto,
} from '../purchase/dto/create-purchase.dto';
import { LoggerService } from '../logger.service';
import { UsersService } from '../users/users.service';
import { TransactionsService } from '../transactions/transactions.service';

@ApiTags('Client')
@Controller('purchase-finish')
export class PurchaseFinishController {
  private readonly webhookSecret = process.env.WEBHOOK_SECRET;

  constructor(
    private readonly logger: LoggerService,
    private readonly usersService: UsersService,
    private readonly transactionsService: TransactionsService
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Finish purchase' })
  @ApiBody({ type: FinishPurchaseDto })
  @ApiResponse({
    status: 200,
    description: 'Purchase created',
    type: FinishPurchaseResultDto,
  })
  async finishPayment(@Request() req, @Response() res) {
    this.logger.log(req.body);
    this.logger.log(req.params);
    this.logger.log(req.headers);

    const webhookEvent = req.body;
    if (webhookEvent.type === 'InvoiceSettled') {
      const invoiceData = webhookEvent.data;
      console.log('Invoice settled:', invoiceData);
      this.logger.error(webhookEvent);
      // Perform necessary actions, e.g., update database
      const user = await this.usersService.findOne(invoiceData.metadata.userId);
      if (user) {
        user.balance += invoiceData.amount;
        await this.usersService.update(user);
        this.transactionsService.updateBalanceAfter(
          webhookEvent.invoiceId,
          user.balance
        );
      } else {
        this.logger.log('USER NOT FOUND:');
        this.logger.log(invoiceData);
      }
    }

    res.status(HttpStatus.OK).send('Webhook received');
  }
}
