import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { NotificationsRepository } from '../repositories/notifications.repository';
import {
  Notification,
  NotificationPaginationParams,
} from '../../enterprise/entities/notification.entity';

interface FindNotificationsByRecipientIdUseCaseRequest {
  recipientId: string;
  pagination: NotificationPaginationParams;
}

type FindNotificationsByRecipientIdUseCaseResponse = Either<
  null,
  {
    notifications: Notification[];
  }
>;

@Injectable()
export class FindNotificationsByRecipientIdUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    pagination,
  }: FindNotificationsByRecipientIdUseCaseRequest): Promise<FindNotificationsByRecipientIdUseCaseResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(
        recipientId,
        pagination,
      );

    return right({ notifications });
  }
}
