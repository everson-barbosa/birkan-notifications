import { Module } from '@nestjs/common';
import { NotificationsRepository } from './repositories/notifications.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications.repository';
import { RecipientsRepository } from './repositories/recipients.repository';
import { PrismaRecipientsRepository } from './prisma/repositories/prisma-recipients.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: RecipientsRepository,
      useClass: PrismaRecipientsRepository,
    },
  ],
  exports: [NotificationsRepository, RecipientsRepository],
})
export class DatabaseModule {}
