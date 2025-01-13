import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class VerifySignatureMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const signatureHeader = req.headers['btcpay-signature'] as string;
    const webhookSecret = process.env.WEBHOOK_SECRET;

    if (!signatureHeader || !webhookSecret) {
      throw new UnauthorizedException('Invalid or missing webhook signature');
    }

    const payload = JSON.stringify(req.body);
    const computedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    if (computedSignature !== signatureHeader) {
      throw new UnauthorizedException('Signature verification failed');
    }

    next();
  }
}
