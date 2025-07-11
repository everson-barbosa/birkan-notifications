import { Notification as PrismaNotification } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Notification } from 'src/entities/notification.entity';

export class PrismaNotificationMapper {
  static toPrisma(raw: Notification): PrismaNotification {
    return {
      recipientId: raw.recipientId.toString(),
      id: raw.id.toString(),
      title: raw.title,
      content: raw.content,
      createdAt: raw.createdAt,
      readedAt: raw.readedAt,
    };
  }

  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        recipientId: new UniqueEntityID(raw.recipientId),
        title: raw.title,
        content: raw.content,
        createdAt: raw.createdAt,
        readedAt: raw.readedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
}
