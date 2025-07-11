import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from 'src/database/repositories/notifications.repository';
import { Notification } from 'src/entities/notification.entity';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification);
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data,
    });
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: notification.id.toString(),
      },
      data,
    });
  }
}
