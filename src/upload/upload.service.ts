import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './upload.entity';
import { generateNumericIdFromUUID, getCurrentFormattedDate } from '../utils';
import * as fs from 'fs';
import * as path from 'path';
import { ClickHouseService } from '../clickhouse/clickhouse.service';
import * as csvParser from 'csv-parser';

@Injectable()
export class UploadService {
  total = 0;

  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    private readonly clickHouseService: ClickHouseService
  ) {}

  async create(uploadData: any) {
    const upload = this.uploadRepository.create(uploadData);
    const row = {
      ...upload,
      created_on: getCurrentFormattedDate(),
    };
    return this.uploadRepository.save(row);
  }

  async getRecords(): Promise<Upload[]> {
    return this.uploadRepository
      .createQueryBuilder('upload')
      .where('upload.started_on IS NULL')
      .orderBy('upload.id', 'ASC')
      .limit(5)
      .getMany();
  }

  async processRecordsSequentially(): Promise<void> {
    const records = await this.getRecords();
    for (const record of records) {
      console.log(`Processing record ID: ${record.id}`);
      await this.processRecord(record);
      console.log(`Record ID: ${record.id} processed`);
    }
    console.log('All records processed');
  }

  private async processRecord(record: Upload): Promise<void> {
    await this.uploadRepository.update(record.id, { started_on: new Date() });

    await this.parse(record);

    await this.uploadRepository.update(record.id, {
      finished_on: new Date(),
      rows_added: this.total,
    });
  }

  async process() {
    await this.processRecordsSequentially();
  }

  async parse(item: Upload) {
    const filePath = path.join(__dirname, '../..', 'uploads', item.path);
    await this.readAndParseFile(filePath);
  }

  async rerun(filename: string) {
    const filePath = path.join(__dirname, '../..', 'uploads', filename);
    await this.readAndParseFile(filePath);
  }

  async readAndParseFile(filePath: string) {
    const BATCH_SIZE = 1000;
    let dataBatch = [];
    const tableName = 'phone_number';

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser({ headers: ['number'] }))
        .on('data', async (row) => {
          // const exists = await this.clickHouseService.rowExists(
          //   tableName,
          //   `lrn = '${row.number}'`
          // );
          // if (!exists) {
          dataBatch.push({
            id: generateNumericIdFromUUID(),
            lrn: row.number,
          });
          if (dataBatch.length >= BATCH_SIZE) {
            this.total += dataBatch.length;
            const batch = dataBatch;
            dataBatch = [];
            await this.clickHouseService.insertBatch(batch, tableName);
          }
          // }
        })
        .on('end', async () => {
          if (dataBatch.length > 0) {
            await this.clickHouseService.insertBatch(dataBatch, tableName);
            this.total += dataBatch.length;
          }
          console.log('CSV file successfully processed');
          resolve();
        })
        .on('error', (error) => {
          console.error('Error processing CSV file:', error);
          reject(error);
        });
    });
  }
}
