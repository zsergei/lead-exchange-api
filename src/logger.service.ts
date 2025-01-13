import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private logger;

  constructor() {
    this.logger = createLogger({
      level: 'info', // Default log level
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${typeof message === 'object' ? JSON.stringify(message) : message}`;
        })
      ),
      transports: [
        // Write all logs to a file (rotating daily)
        new DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d', // Keep logs for 14 days
        }),
        // Optionally, log errors to a separate file
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxFiles: '14d',
        }),
        // Console output (optional)
        new transports.Console(),
      ],
    });
  }

  log(message: string | object) {
    this.logger.info(message);
  }

  error(message: string | object, trace?: string) {
    this.logger.error({ message, trace });
  }

  warn(message: string | object) {
    this.logger.warn(message);
  }

  debug(message: string | object) {
    this.logger.debug(message);
  }

  verbose(message: string | object) {
    this.logger.verbose(message);
  }
}
