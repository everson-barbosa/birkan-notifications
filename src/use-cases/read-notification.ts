import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { NotAllowedError } from 'src/core/errors/use-cases/not-allowed.error';
import { ResourceNotFoundError } from 'src/core/errors/use-cases/resource-not-found.error';
import { NotificationsRepository } from 'src/database/repositories/notifications.repository';
import { Notification } from 'src/entities/notification.entity';

interface ReadNotificationUseCaseRequest {
  recipientId: string;
  notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    const isNotOwnerOfTheNotification =
      notification.recipientId.toString() !== recipientId;

    if (isNotOwnerOfTheNotification) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return right({ notification });
  }
}
