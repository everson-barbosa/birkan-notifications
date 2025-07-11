import { Injectable } from '@nestjs/common';
import {
  Notification,
  NotificationPaginationParams,
} from '../../enterprise/entities/notification.entity';

@Injectable()
export abstract class NotificationsRepository {
  abstract findById(id: string): Promise<Notification | null>;
  abstract findManyByRecipientId(
    recipientId: string,
    params: NotificationPaginationParams,
  ): Promise<Notification[]>;
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
}
