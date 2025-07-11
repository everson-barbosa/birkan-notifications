import { Injectable } from '@nestjs/common';
import { Recipient } from '../../enterprise/entities/recipient.entity';

@Injectable()
export abstract class RecipientsRepository {
  abstract findById(id: string): Promise<Recipient | null>;
}
