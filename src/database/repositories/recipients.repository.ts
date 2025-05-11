import { Injectable } from '@nestjs/common';
import { Recipient } from 'src/entities/recipient.entity';

@Injectable()
export abstract class RecipientsRepository {
  abstract findById(id: string): Promise<Recipient | null>;
}
