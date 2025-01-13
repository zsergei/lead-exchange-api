import { HttpException, Injectable } from '@nestjs/common';
import { ClickHouseService } from '../clickhouse/clickhouse.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneNumber } from '../phone_numbers/phone_number.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class PhoneNumbersService {
  private readonly apiUrl = process.env.TELCOMDATA_API_URL;
  private readonly email = process.env.TELCOMDATA_EMAIL;
  private readonly password = process.env.TELCOMDATA_PASSWORD;

  constructor(
    @InjectRepository(PhoneNumber)
    private readonly phoneNumberRepository: Repository<PhoneNumber>,
    private readonly clickHouseService: ClickHouseService
  ) {}

  async process() {
    const token = await this.getTelcomDataToken();
    const records = await this.getRecords();
    for (const record of records) {
      console.log(`Processing record ID: ${record.id}`);
      await this.processRecord(record, token);
    }
    console.log('All records processed');
  }

  async getRecords(): Promise<PhoneNumber[]> {
    const query =
      'SELECT * FROM phone_number WHERE length(ocn)=0 ORDER BY created_on ASC LIMIT 300';
    return this.clickHouseService.executeQuery(query);
  }

  private async processRecord(
    record: PhoneNumber,
    token: string
  ): Promise<void> {
    const data = await this.checkTelcomDataNumber(record.lrn, token);
    // update phone_number
    const query = `ALTER TABLE phone_number UPDATE 
        country='${data.country}', 
        state='${data.state}', 
        is_dno=${data.dno === true ? 1 : 0}, 
        is_dnc=${data.dnc === true ? 1 : 0}, 
        ocn='${data.ocn}', 
        operator='${data.op_company ? data.op_company.replaceAll("'", '"') : ''}' 
    WHERE lrn='${record.lrn}'`;
    await this.clickHouseService.executeQuery(query);
  }

  private async getTelcomDataToken() {
    try {
      const url = `${this.apiUrl}/auth/login`;

      const response = await axios.post(url, {
        email: this.email,
        password: this.password,
      });

      return response.data.data.access;
    } catch (error) {
      console.error(
        'Error creating auth token:',
        error.response?.data || error.message
      );
      throw new HttpException(
        'Failed to create auth token',
        error.response?.status || 500
      );
    }
  }

  private async checkTelcomDataNumber(lrn: string, token: string) {
    const url = `${this.apiUrl}/users/task/check_number?tn=${lrn}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }
}
