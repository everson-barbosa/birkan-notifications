import { Injectable } from '@nestjs/common';
import { EventConsumer } from '../event-consumer';
import { SendNotificationUseCase } from 'src/use-cases/send-notification';

@Injectable()
export class ExamTemplateCreatedConsumer {
  constructor(
    private eventConsumer: EventConsumer,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.handle();
  }

  async handle() {
    this.eventConsumer.consume({
      topic: 'exams.exam-template.created.v1',
      groupId: 'birkan-exam-api',
      handler: (message) => {
        console.log({
          message,
          logger: ExamTemplateCreatedConsumer.name,
        });
      },
    });
  }
}
