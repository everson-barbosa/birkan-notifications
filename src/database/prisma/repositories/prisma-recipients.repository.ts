import { Injectable } from '@nestjs/common';
import { RecipientsRepository } from 'src/database/repositories/recipients.repository';
import { Recipient } from 'src/entities/recipient.entity';
import { PrismaService } from '../prisma.service';
import { PrismaRecipientMapper } from '../mappers/prisma-recipient.mapper';

@Injectable()
export class PrismaRecipientsRepository implements RecipientsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Recipient | null> {
    const notification = await this.prismaService.recipient.findUnique({
      where: {
        id,
      },
    });

    if (!notification) return null;

    return PrismaRecipientMapper.toDomain(notification);
  }
}
