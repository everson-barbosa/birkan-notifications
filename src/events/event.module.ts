import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ExamTemplateCreatedConsumer } from './consumers/exam-template-created.consumer';
import { EventConsumer } from './event-consumer';
import { KafkaEventConsumer } from './kafka/kafka-event-consumer';
import { KafkaService } from './kafka/kafka.service';
import { KafkaEventProducer } from './kafka/kafka-event-producer';
import { EventProducer } from './event-producer';
import { ScheduleModule } from '@nestjs/schedule';
import { SendNotificationUseCase } from 'src/use-cases/send-notification';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  providers: [
    KafkaService,
    SendNotificationUseCase,
    ExamTemplateCreatedConsumer,
    {
      useClass: KafkaEventConsumer,
      provide: EventConsumer,
    },
    {
      useClass: KafkaEventProducer,
      provide: EventProducer,
    },
  ],
})
export class EventModule {}
