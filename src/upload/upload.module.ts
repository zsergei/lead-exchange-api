import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Upload } from './upload.entity';
import { UsersModule } from '../users/users.module';
import { ClickHouseModule } from '../clickhouse/clickhouse.module';

@Module({
  imports: [TypeOrmModule.forFeature([Upload]), UsersModule, ClickHouseModule],
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
