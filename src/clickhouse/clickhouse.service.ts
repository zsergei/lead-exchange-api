import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ClickHouse } from 'clickhouse';
import { createClient, ClickHouseClient } from '@clickhouse/client';

interface QueryResult {
  count: number;
}

interface CountResult {
  total: number;
}

@Injectable()
export class ClickHouseService implements OnModuleDestroy {
  private clickHouse: ClickHouse;
  private client: ClickHouseClient;

  constructor() {
    this.clickHouse = new ClickHouse({
      url: process.env.CLICKHOUSE_URL || 'http://localhost',
      port: parseInt(process.env.CLICKHOUSE_PORT, 10) || 8123,
      database: 'lead_exchange',
      username: process.env.CLICKHOUSE_USER || 'default',
      password: process.env.CLICKHOUSE_PASSWORD || '',
      debug: false,
      isUseGzip: true,
      log: console.log,
    });
    //
    this.client = createClient({
      url:
        `${process.env.CLICKHOUSE_URL}:${process.env.CLICKHOUSE_PORT}` ||
        'http://localhost',
      database: 'lead_exchange',
      username: process.env.CLICKHOUSE_USER || 'default',
      password: process.env.CLICKHOUSE_PASSWORD || '',
    });
  }

  async insertBatch(data: Array<Record<string, any>>, tableName: string) {
    await this.client.insert({
      table: tableName,
      values: data,
      format: 'JSONEachRow', // Format optimized for bulk inserts
    });
  }

  onModuleDestroy() {
    this.client.close();
  }

  async executeQuery(query: string, params: any[] = []): Promise<any> {
    return this.clickHouse.query(query, { params }).toPromise();
  }

  async rowExists(tableName: string, condition: string): Promise<boolean> {
    const query = `SELECT COUNT(*) AS count FROM ${tableName} WHERE ${condition}`;
    const result = await this.clickHouse.query(query).toPromise();
    const rows: QueryResult[] = result as QueryResult[];
    const cnt = rows[0]?.count || 0;

    return cnt > 0;
  }

  async getNumbers(
    page: number = 1,
    limit: number = 10,
    conditions: string = null
  ) {
    const offset = (page - 1) * limit;

    const dataQuery = `
      SELECT *
      FROM phone_number
      ${conditions ? ' WHERE ' + conditions + ' ' : ''}
      ORDER BY created_on ASC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const countQuery = `SELECT count(*) AS total FROM phone_number ${conditions ? ' WHERE ' + conditions + ' ' : ''}`;

    const [dataResult, countResult] = await Promise.all([
      this.client.query({ query: dataQuery, format: 'JSONEachRow' }),
      this.client.query({ query: countQuery, format: 'JSONEachRow' }),
    ]);

    const data = await dataResult.json();
    const count = (await countResult.json()) as CountResult[];

    return {
      data,
      total: count[0]?.total || 0,
      page,
      limit,
      totalPages: Math.ceil((count[0]?.total || 0) / limit),
    };
  }
}
