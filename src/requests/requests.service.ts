import { Injectable } from '@nestjs/common';
import { Request } from './request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getCurrentFormattedDate } from '../utils';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>
  ) {}

  async create(
    createRequestDto: CreateRequestDto,
    user_id: string
  ): Promise<any> {
    const request = this.requestRepository.create();
    const data = {
      ...request,
      ...createRequestDto,
      user_id: user_id,
      created_on: getCurrentFormattedDate(),
    };
    console.log(data);
    const res = await this.requestRepository.save(data);
    return { order_uuid: res.id };
  }
}
