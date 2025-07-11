import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { Notification } from '../../enterprise/entities/notification.entity';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { RecipientsRepository } from '../repositories/recipients.repository';

interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

type SendNotificationUseCaseResponse = Either<
  Error,
  {
    notification: Notification;
  }
>;

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId);

    if (!recipient) {
      return left(new Error());
    }

    const notification = Notification.create({
      recipientId: recipient.id,
      title,
      content,
    });

    await this.notificationsRepository.create(notification);

    return right({
      notification,
    });
  }
}
