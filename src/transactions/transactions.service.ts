import { Injectable } from '@nestjs/common';
import { generateNumericIdFromUUID, getCurrentFormattedDate } from '../utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) {}

  async create(
    credit: number,
    debit: number,
    invoice_id: string,
    balanceBefore: number,
    balanceAfter: number,
    author_id: string,
    user_id: string,
    is_manual_credit: boolean,
    order_uuid: string = null
  ): Promise<void> {
    const trans = this.transactionRepository.create();
    await this.transactionRepository.save({
      ...trans,
      credit: credit,
      debit: debit,
      order_uuid: order_uuid ?? `${generateNumericIdFromUUID()}`,
      btcpay_id: invoice_id,
      balance_before: balanceBefore,
      balance_after: balanceAfter,
      author_id: author_id,
      user_id: user_id,
      created_on: getCurrentFormattedDate(),
      is_manual_credit: is_manual_credit,
    });
  }

  async updateBalanceAfter(invoiceId: string, amount: number) {
    const trans = this.transactionRepository.findOneBy({
      btcpay_id: invoiceId,
    });
    await this.transactionRepository.save({ ...trans, balance_after: amount });
  }
}
