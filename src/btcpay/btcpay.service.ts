import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BtcpayService {
  private readonly apiUrl = process.env.API_URL;
  private readonly apiKey = process.env.API_KEY;
  private readonly storeId = process.env.STORE_ID;

  // Create a payment invoice
  async createInvoice(
    amount: number,
    currency: string,
    user_id: string
  ): Promise<any> {
    try {
      const url = `${this.apiUrl}/v1/stores/${this.storeId}/invoices`;

      const response = await axios.post(
        url,
        {
          amount, // Amount to charge
          currency, // e.g., "USD", "BTC", etc.
          checkout: {
            redirectAutomatically: false, // Redirect the user to the payment page automatically after invoice creation
          },
          metadata: {
            userId: user_id,
          },
        },
        {
          headers: {
            Authorization: `token ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error creating BTCPay invoice:',
        error.response?.data || error.message
      );
      throw new HttpException(
        'Failed to create invoice',
        error.response?.status || 500
      );
    }
  }
}
